import { useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import type { Card } from '../lib/types';

export function useVoice() {
    const { voiceEnabled } = useSettings();

    const speakCard = useCallback((card: Card) => {
        if (!voiceEnabled) return;

        // Cancel pending speech to avoid queue buildup
        window.speechSynthesis.cancel();

        const text = `${card.rank} of ${card.suit}`;
        const utterance = new SpeechSynthesisUtterance(text);

        // Enhance voice settings if possible
        utterance.rate = 1.1; // Slightly faster
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    }, [voiceEnabled]);

    return { speakCard };
}
