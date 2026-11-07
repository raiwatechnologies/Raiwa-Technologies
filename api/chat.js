/**
 * Vercel Serverless Function — POST /api/chat
 *
 * AI Q&A Assistant for Raiwa Technologies & Web Learning
 * Powered by OpenRouter Cloud Embeddings + Ollama Cloud / OpenRouter Chat
 * with multi-chunk RAG retrieval (checks > 3 chunks for comprehensive answers).
 *
 * Environment variables:
 *   OPENROUTER_API_KEY          — OpenRouter API key for cloud embeddings and/or chat
 *   OPENROUTER_EMBEDDING_MODEL  — e.g. "openai/text-embedding-3-small" (default)
 *   OPENROUTER_CHAT_MODEL       — e.g. "meta-llama/llama-3.1-8b-instruct:free"
 *   OLLAMA_API_URL              — e.g. "https://your-ollama.com" or "http://localhost:11434"
 *   OLLAMA_MODEL                — e.g. "llama3.1" (default)
 *   OLLAMA_API_KEY              — Optional Bearer token for cloud Ollama
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieve 6 chunks (>3 chunks as requested) for thorough context
const TOP_K_CHUNKS = 6;

let cachedKnowledge = null;

function loadKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;

  const candidatePaths = [
    path.resolve(__dirname, '../knowledge/knowledge-index.json'),
    path.resolve(__dirname, '../../knowledge/knowledge-index.json'),
    path.resolve(process.cwd(), 'apps/web/knowledge/knowledge-index.json'),
    path.resolve(process.cwd(), 'knowledge/knowledge-index.json'),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, 'utf8');
        cachedKnowledge = JSON.parse(raw);
        return cachedKnowledge;
      } catch {
        // try next
      }
    }
  }

  return { chunks: [] };
}

function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/**
 * Embed query using OpenRouter API
 */
async function getQueryEmbeddingOpenRouter(query, apiKey, model) {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://raiwatechnologies.com',
        'X-Title': 'Raiwa Technologies Chat Q&A',
      },
      body: JSON.stringify({
        model: model || 'openai/text-embedding-3-small',
        input: query,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.[0]?.embedding || null;
  } catch (err) {
    console.warn('[OpenRouter Embedding Error]:', err?.message || err);
    return null;
  }
}

/**
 * Retrieve top relevant chunks for a user query.
 * Uses OpenRouter vector cosine similarity if embeddings are present,
 * otherwise falls back to token frequency scoring.
 */
async function retrieveRelevantChunks(query, k = TOP_K_CHUNKS) {
  const index = loadKnowledge();
  const chunks = index.chunks || [];
  if (chunks.length === 0) return [];

  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const embeddingModel = process.env.OPENROUTER_EMBEDDING_MODEL || 'openai/text-embedding-3-small';

  // 1. Try Vector Semantic Search if key is available and chunks have embeddings
  const hasEmbeddings = chunks.some((c) => Array.isArray(c.embedding) && c.embedding.length > 0);

  if (openrouterKey && hasEmbeddings) {
    const queryVector = await getQueryEmbeddingOpenRouter(query, openrouterKey, embeddingModel);

    if (queryVector) {
      const scored = chunks.map((chunk) => {
        let similarity = 0;
        if (chunk.embedding) {
          similarity = cosineSimilarity(queryVector, chunk.embedding);
        }
        return { chunk, score: similarity };
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, k).map((item) => item.chunk);
    }
  }

  // 2. Fallback: Fast keyword / token scoring
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return chunks.slice(0, k);

  const scored = chunks.map((chunk) => {
    const contentTokens = tokenize(chunk.content);
    let score = 0;

    for (const qToken of queryTokens) {
      let count = 0;
      for (const cToken of contentTokens) {
        if (cToken === qToken) count += 3;
        else if (cToken.includes(qToken) || qToken.includes(cToken)) count += 1;
      }
      score += count;
    }

    const lowerSource = (chunk.source || '').toLowerCase();
    for (const qToken of queryTokens) {
      if (lowerSource.includes(qToken)) score += 5;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((item) => item.chunk);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body || {};
  const query = (message || '').trim();

  if (!query) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const retrievedChunks = await retrieveRelevantChunks(query, TOP_K_CHUNKS);
  const contextSnippet = retrievedChunks
    .map((c, i) => `[Source ${i + 1} (${c.source})]:\n${c.content}`)
    .join('\n\n---\n\n');

  const systemPrompt = `You are the AI Assistant for Raiwa Technologies (https://raiwatechnologies.com).
Your purpose is twofold:
1. Help visitors and potential clients learn about Raiwa Technologies' services (Ecommerce management, web/mobile development, branding, digital marketing, ads, store management).
2. Assist students and learners with questions about web development (HTML, CSS, JavaScript, React, Tailwind, APIs, backend, fullstack roadmap).

Guidelines:
- Provide friendly, accurate, and detailed responses based on the Company & Web Knowledge context below.
- Use formatting (bullet points, clear paragraphs, code snippets when explaining code).
- For business inquiries or service consultations, mention that they can contact the team directly via WhatsApp at +92 322 9160096 or the Contact page.
- Be encouraging to students asking programming and web questions.

COMPANY & WEB KNOWLEDGE CONTEXT (Retrieved ${retrievedChunks.length} documents):
${contextSnippet}`;

  // Message sequence for LLM
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content || '',
    })),
    { role: 'user', content: query },
  ];

  // Try Ollama Cloud first (if configured)
  const ollamaUrl = process.env.OLLAMA_API_URL;
  const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.1';
  const ollamaKey = process.env.OLLAMA_API_KEY;

  if (ollamaUrl) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (ollamaKey) headers.Authorization = `Bearer ${ollamaKey}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(`${ollamaUrl}/api/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: ollamaModel,
          messages,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const reply = data?.message?.content || data?.response || '';
        if (reply.trim()) {
          return res.status(200).json({
            reply,
            sources: retrievedChunks.map((c) => c.source),
          });
        }
      }
    } catch (err) {
      console.warn('[Ollama API call error]:', err?.message || err);
    }
  }

  // Try OpenRouter Chat if configured
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (openrouterKey) {
    try {
      const openrouterChatModel =
        process.env.OPENROUTER_CHAT_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openrouterKey}`,
          'HTTP-Referer': 'https://raiwatechnologies.com',
          'X-Title': 'Raiwa Technologies Chat',
        },
        body: JSON.stringify({
          model: openrouterChatModel,
          messages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (orResponse.ok) {
        const orData = await orResponse.json();
        const reply = orData?.choices?.[0]?.message?.content || '';
        if (reply.trim()) {
          return res.status(200).json({
            reply,
            sources: retrievedChunks.map((c) => c.source),
          });
        }
      }
    } catch (err) {
      console.warn('[OpenRouter Chat Error]:', err?.message || err);
    }
  }

  // Fallback: Synthesized response from retrieved knowledge chunks
  let fallbackReply = `Hello! Here is what I found regarding your question:\n\n`;

  if (retrievedChunks.length > 0) {
    const bestChunk = retrievedChunks[0];
    fallbackReply += `${bestChunk.content}\n\n`;
    if (retrievedChunks.length > 1) {
      fallbackReply += `### Additional Details:\n${retrievedChunks[1].content.slice(0, 450)}...\n\n`;
    }
  } else {
    fallbackReply += `Raiwa Technologies provides comprehensive ecommerce management, custom website & mobile app development, branding, and digital marketing.\n\n`;
  }

  fallbackReply += `\n💬 Have a specific project or need custom help? Message our team directly on WhatsApp (+92 322 9160096) or request a free consultation through our Contact page!`;

  return res.status(200).json({
    reply: fallbackReply,
    sources: retrievedChunks.map((c) => c.source),
    fallback: true,
  });
}
