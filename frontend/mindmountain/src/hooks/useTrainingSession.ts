import { useState, useCallback } from 'react';
import type { Card, Suit, Rank, TrainingSession } from '../lib/types';

const SUITS: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Helper to generate a full deck
const generateDeck = (): Card[] => {
    const deck: Card[] = [];
    SUITS.forEach(suit => {
        RANKS.forEach(rank => {
            deck.push({
                id: `${suit.toLowerCase()}-${rank}`,
                suit,
                rank
            });
        });
    });
    return deck;
};

// Fisher-Yates Shuffle
const shuffleDeck = (deck: Card[]): Card[] => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
};

export const useTrainingSession = () => {
    const [session, setSession] = useState<TrainingSession>({
        phase: 'setup',
        deck: [],
        currentIndex: 0,
        results: {},
    });

    const startSession = useCallback((count: number) => {
        const fullDeck = generateDeck();
        const shuffled = shuffleDeck(fullDeck);
        const selectedCards = shuffled.slice(0, count);

        setSession({
            phase: 'memorize',
            deck: selectedCards,
            currentIndex: 0,
            results: {},
        });
    }, []);

    const nextCard = useCallback(() => {
        setSession(prev => {
            // If we are at the last card, move to next phase
            if (prev.currentIndex >= prev.deck.length - 1) {
                if (prev.phase === 'memorize') {
                    // Transitions to Review, reset index to 0
                    return { ...prev, phase: 'review', currentIndex: 0 };
                } else if (prev.phase === 'review') {
                    // Transitions to Summary
                    return { ...prev, phase: 'summary' };
                }
            }
            // Otherwise just increment
            return { ...prev, currentIndex: prev.currentIndex + 1 };
        });
    }, []);

    const recordResult = useCallback((isCorrect: boolean) => {
        setSession(prev => {
            const currentCard = prev.deck[prev.currentIndex];
            const newResults = { ...prev.results, [currentCard.id]: isCorrect };

            // Moving logic is same as nextCard, but we need to update results first
            if (prev.currentIndex >= prev.deck.length - 1) {
                return { ...prev, phase: 'summary', results: newResults };
            }

            return {
                ...prev,
                results: newResults,
                currentIndex: prev.currentIndex + 1
            };
        });
    }, []);

    const resetSession = useCallback(() => {
        setSession({
            phase: 'setup',
            deck: [],
            currentIndex: 0,
            results: {},
        });
    }, []);

    return {
        session,
        startSession,
        nextCard,
        recordResult,
        resetSession
    };
};
