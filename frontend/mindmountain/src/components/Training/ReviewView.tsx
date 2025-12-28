import { useState } from 'react';
import type { Card } from '../../lib/types';
import { PlayingCard } from '../PlayingCard';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useSettings } from '../../contexts/SettingsContext';
import { useSound } from '../../hooks/useSound';

interface ReviewViewProps {
    card: Card;
    index: number;
    total: number;
    onResult: (correct: boolean) => void;
}

export function ReviewView({ card, index, total, onResult }: ReviewViewProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const { animationSpeed } = useSettings();
    const { playFlip, playCorrect, playIncorrect } = useSound();

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

    return (
        <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Recall Phase</span>
                <h2 className="text-2xl font-display font-bold text-text-main">Card {index + 1} of {total}</h2>
            </div>

            <div className="relative">
                <PlayingCard
                    card={card}
                    isFaceUp={isRevealed}
                    className={`transition-all ${speedClass}`}
                />
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
