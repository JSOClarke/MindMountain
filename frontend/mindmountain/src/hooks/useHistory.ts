import { useState, useCallback, useEffect } from 'react';
import type { HistoryEntry } from '../lib/types';

const STORAGE_KEY = 'mindmountain_history';

export function useHistory() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    // Load history on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setHistory(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }, []);

    const addEntry = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
        const newEntry: HistoryEntry = {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };

        setHistory(prev => {
            const updated = [newEntry, ...prev];
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to save history", e);
            }
            return updated;
        });
    }, []);

    const clearHistory = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setHistory([]);
    }, []);

    return { history, addEntry, clearHistory };
}
