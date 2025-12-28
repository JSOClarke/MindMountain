import { useState } from 'react';
import type { Card } from '../../lib/types';
import { PlayingCard } from '../PlayingCard';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useSound } from '../../hooks/useSound';

interface MemorizeViewProps {
    card: Card;
    index: number;
    total: number;
    onNext: () => void;
}

export function MemorizeView({ card, index, total, onNext }: MemorizeViewProps) {
    const [isActive, setIsActive] = useState(false);
    const { playSwipe } = useSound();

    const handleNext = () => {
        playSwipe();
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);
        onNext();
    };

    useKeyboard({
        'ArrowRight': handleNext,
        ' ': handleNext, // Spacebar
    });

    return (
        <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Memorizing Loop</span>
                <h2 className="text-2xl font-display font-bold text-text-main">Card {index + 1} of {total}</h2>
            </div>

            <PlayingCard card={card} isFaceUp={true} />

            <button
                onClick={handleNext}
                className={`px-12 py-4 bg-primary text-primary-foreground font-bold text-lg 
        shadow-[4px_4px_0px_0px_rgba(45,55,72,0.1)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3
        ${isActive ? 'translate-y-[2px] shadow-none bg-primary/90' : ''}`}
            >
                Next Card
                <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-white/20 px-2 font-mono text-xs font-medium text-primary-foreground opacity-80">
                    Space
                </kbd>
            </button>
        </div>
    );
}
