import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.resolve(__dirname, '../knowledge');
const OUTPUT_FILE = path.resolve(KNOWLEDGE_DIR, 'knowledge-index.json');
const ROOT_KNOWLEDGE_DIR = path.resolve(__dirname, '../../../knowledge');
const ROOT_OUTPUT_FILE = path.resolve(ROOT_KNOWLEDGE_DIR, 'knowledge-index.json');

// Optional: check .env files
function loadEnv() {
  const envPaths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../../api/.env'),
    path.resolve(__dirname, '../../../.env'),
  ];
  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [k, ...v] = trimmed.split('=');
        if (k && v.length > 0 && !process.env[k.trim()]) {
          process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
}

loadEnv();

function cleanText(text) {
  return text.replace(/\r\n/g, '\n').trim();
}

function chunkDocument(docName, content) {
  const sections = content.split(/\n(?=##?\s)/);
  const chunks = [];

  for (let sIdx = 0; sIdx < sections.length; sIdx++) {
    const section = cleanText(sections[sIdx]);
    if (!section || section.length < 30) continue;

    if (section.length > 1200) {
      const paragraphs = section.split(/\n\n+/);
      let currentChunk = '';
      for (const p of paragraphs) {
        if ((currentChunk + '\n\n' + p).length > 1000) {
          if (currentChunk.trim()) {
            chunks.push({
              id: `${docName}-s${sIdx}-c${chunks.length}`,
              source: docName,
              content: currentChunk.trim(),
            });
          }
          currentChunk = p;
        } else {
          currentChunk = currentChunk ? `${currentChunk}\n\n${p}` : p;
        }
      }
      if (currentChunk.trim()) {
        chunks.push({
          id: `${docName}-s${sIdx}-c${chunks.length}`,
          source: docName,
          content: currentChunk.trim(),
        });
      }
    } else {
      chunks.push({
        id: `${docName}-s${sIdx}`,
        source: docName,
        content: section,
      });
    }
  }

  return chunks;
}

/**
 * Fetch vector embeddings from OpenRouter Cloud API.
 * Uses OpenAI-compatible /v1/embeddings endpoint.
 */
async function fetchOpenRouterEmbeddings(texts, apiKey, model) {
  const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://raiwatechnologies.com',
      'X-Title': 'Raiwa Technologies Knowledge Embedding',
    },
    body: JSON.stringify({
      model: model || 'openai/text-embedding-3-small',
      input: texts,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`OpenRouter Embedding API failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  if (!data?.data || !Array.isArray(data.data)) {
    throw new Error('Unexpected OpenRouter embeddings response format');
  }

  // data.data is sorted by index
  return data.data.map((item) => item.embedding);
}

async function buildIndex() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.error(`Knowledge directory does not exist: ${KNOWLEDGE_DIR}`);
    return;
  }

  const files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith('.md'));
  const allChunks = [];

  for (const file of files) {
    const fullPath = path.join(KNOWLEDGE_DIR, file);
    const text = fs.readFileSync(fullPath, 'utf8');
    const docName = path.basename(file, '.md');
    const chunks = chunkDocument(docName, text);
    allChunks.push(...chunks);
  }

  console.log(`Extracted ${allChunks.length} chunks from ${files.length} markdown documents.`);

  // Check for OpenRouter API Key
  const apiKey =
    process.env.OPENROUTER_API_KEY ||
    process.argv.find((arg) => arg.startsWith('--key='))?.split('=')[1];
  const model = process.env.OPENROUTER_EMBEDDING_MODEL || 'openai/text-embedding-3-small';

  let embeddedCount = 0;

  if (apiKey) {
    console.log(`Generating OpenRouter cloud embeddings using model: ${model}...`);
    const BATCH_SIZE = 15;

    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
      const batch = allChunks.slice(i, i + BATCH_SIZE);
      const batchTexts = batch.map((c) => `${c.source}: ${c.content}`);

      try {
        const embeddings = await fetchOpenRouterEmbeddings(batchTexts, apiKey, model);
        for (let j = 0; j < batch.length; j++) {
          batch[j].embedding = embeddings[j];
          embeddedCount++;
        }
        console.log(`Embedded chunks ${i + 1} to ${Math.min(i + BATCH_SIZE, allChunks.length)} / ${allChunks.length}`);
      } catch (err) {
        console.warn(`Warning: Failed to embed batch starting at index ${i}:`, err.message);
      }
    }
    console.log(`OpenRouter embeddings generated for ${embeddedCount} / ${allChunks.length} chunks.`);
  } else {
    console.log(
      'NOTE: OPENROUTER_API_KEY not found. Built index with text & keyword search. Set OPENROUTER_API_KEY and run "npm run build:knowledge" to generate vector embeddings.'
    );
  }

  const indexData = {
    updatedAt: new Date().toISOString(),
    totalChunks: allChunks.length,
    embeddingModel: embeddedCount > 0 ? model : null,
    hasVectorEmbeddings: embeddedCount > 0,
    chunks: allChunks,
  };

  const jsonStr = JSON.stringify(indexData, null, 2);
  fs.writeFileSync(OUTPUT_FILE, jsonStr, 'utf8');

  // Also mirror to root knowledge directory
  if (fs.existsSync(ROOT_KNOWLEDGE_DIR)) {
    fs.writeFileSync(ROOT_OUTPUT_FILE, jsonStr, 'utf8');
  }

  console.log(`Knowledge index saved to ${OUTPUT_FILE}`);
}

buildIndex().catch((err) => {
  console.error('Error building knowledge base:', err);
  process.exit(1);
});
