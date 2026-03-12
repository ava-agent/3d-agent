'use client';

import { useState, useCallback } from 'react';
import { HistoryEntry } from '@/types/history';
import { HISTORY_STORAGE_KEY, MAX_HISTORY_ENTRIES } from '@/lib/constants';

function getStoredEntries(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>(getStoredEntries);

  const addEntry = useCallback((entry: HistoryEntry) => {
    setEntries((prev) => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY_ENTRIES);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setEntries([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  }, []);

  return { entries, addEntry, removeEntry, clearAll };
}
