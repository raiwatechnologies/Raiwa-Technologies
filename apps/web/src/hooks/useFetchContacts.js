import { useState, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export const useFetchContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching contacts from PocketBase...');
      // Fetching records with PocketBase, ensuring autoCancel is disabled
      const records = await pb.collection('contacts').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setContacts(records);
      return records;
    } catch (err) {
      console.error('Error fetching contacts:', err);
      
      let errorMessage = 'Failed to fetch contacts.';
      if (err?.response?.message) {
        errorMessage = err.response.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      
      // Gracefully handle connection failures by returning an empty array
      setContacts([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { contacts, fetchContacts, loading, error };
};