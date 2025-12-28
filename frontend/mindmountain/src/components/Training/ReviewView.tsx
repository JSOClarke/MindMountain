import { useState } from 'react';
import type { Card } from '../../lib/types';
import { PlayingCard } from '../PlayingCard';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useSettings } from '../../contexts/SettingsContext';
import { useSound } from '../../hooks/useSound';

import { useVoice } from '../../hooks/useVoice';

interface ReviewViewProps {
    card: Card;
    deck: Card[];
    index: number;
    total: number;
    onResult: (success: boolean) => void;
}

export function ReviewView({ card, deck, index, total, onResult }: ReviewViewProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const { animationSpeed } = useSettings();
    const { playFlip, playCorrect, playIncorrect } = useSound();
    const { speakCard } = useVoice();

    const speedClass = {
        'slow': 'duration-700',
        'normal': 'duration-500',
        'fast': 'duration-300'
    }[animationSpeed];

    const triggerFeedback = (key: string, callback: () => void) => {
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 150);
        callback();
    };

    const handleReveal = () => {
        if (!isRevealed) {
            playFlip();
            speakCard(card);
            setIsRevealed(true);
        }
    };

    const handleResult = (correct: boolean) => {
        if (correct) playCorrect();
        else playIncorrect();
        onResult(correct);
    };

    useKeyboard({
        ' ': () => {
            triggerFeedback('space', handleReveal);
        },
        'Enter': () => {
            triggerFeedback('space', handleReveal);
        },
        '1': () => {
            if (isRevealed) triggerFeedback('1', () => handleResult(false));
        },
        '2': () => {
            if (isRevealed) triggerFeedback('2', () => handleResult(true));
        }
    });

    // Reset reveal state when card changes
    if (isRevealed && false) {
        // This is a bit tricky with React Keys, but parent handles re-mounting by key changes usually.
        // We'll rely on Key from parent.
    }

    const prevCard = deck[index - 1];
    const nextCard = deck[index + 1];

    return (
        <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-right duration-300 w-full max-w-2xl relative">
            <div className="flex flex-col items-center space-y-2 z-10 relative">
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Recall Phase</span>
                <h2 className="text-2xl font-display font-bold text-text-main">Card {index + 1} of {total}</h2>
            </div>

            <div className="relative h-96 w-full flex justify-center items-center">
                {/* Previous Card (Left, Faded, Tilted) */}
                {prevCard && (
                    <div className="absolute left-1/2 -translate-x-[120%] scale-90 opacity-40 blur-[1px] select-none pointer-events-none transition-all duration-500">
                        <PlayingCard
                            card={prevCard}
                            isFaceUp={true}
                            className="shadow-sm"
                        />
                    </div>
                )}

                {/* Current Card (Centered) */}
                <div className="relative z-20">
                    <PlayingCard
                        card={card}
                        isFaceUp={isRevealed}
                        className={`transition-all ${speedClass}`}
                    />
                </div>

                {/* Next Card (Right, Face Down, Tilted Stack) */}
                {nextCard && (
                    <div className="absolute left-1/2 translate-x-[20%] scale-90 opacity-40 select-none pointer-events-none transition-all duration-500">
                        <PlayingCard
                            card={nextCard}
                            isFaceUp={false}
                            className="shadow-sm"
                        />
                        {/* Stack effect layers (fake depth) */}
                        <div className="absolute top-1 left-1 w-full h-full bg-white rounded-xl border border-gray-200 -z-10" />
                        <div className="absolute top-2 left-2 w-full h-full bg-white rounded-xl border border-gray-200 -z-20" />
                    </div>
                )}
            </div>

            {!isRevealed ? (
                <button
                    onClick={handleReveal}
                    className={`px-12 py-4 bg-surface-100 border-2 border-primary/20 text-text-main font-bold text-lg 
         hover:bg-surface-200 transition-all cursor-pointer flex items-center gap-3
         ${activeKey === 'space' ? 'scale-95 bg-surface-200' : ''}`}
                >
                    Flip to Reveal
                    <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-surface-300 bg-surface-200 px-2 font-mono text-xs font-medium text-text-muted">
                        Space
                    </kbd>
                </button>
            ) : (
                <div className="flex gap-4">
                    <button
                        onClick={() => handleResult(false)}
                        className={`px-8 py-4 bg-secondary text-secondary-foreground font-bold text-lg 
                shadow-[4px_4px_0px_0px_rgba(45,55,72,0.1)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3
                ${activeKey === '1' ? 'translate-y-[2px] shadow-none bg-secondary/90' : ''}`}
                    >
                        Missed it
                        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-white/20 bg-white/10 px-2 font-mono text-xs font-medium text-secondary-foreground/80">
                            1
                        </kbd>
                    </button>
                    <button
                        onClick={() => handleResult(true)}
                        className={`px-8 py-4 bg-accent text-accent-foreground font-bold text-lg 
                shadow-[4px_4px_0px_0px_rgba(45,55,72,0.1)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3
                ${activeKey === '2' ? 'translate-y-[2px] shadow-none bg-accent/90' : ''}`}
                    >
                        I knew it!
                        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-white/20 bg-white/10 px-2 font-mono text-xs font-medium text-accent-foreground/80">
                            2
                        </kbd>
                    </button>
                </div>
            )}
        </div>
    );
}
