import { useEffect, useRef } from 'react';
import { LEVELS, type TrainingSession } from '../../lib/types'; // Add LEVELS import
import { PlayingCard } from '../PlayingCard';
import { useHistory } from '../../hooks/useHistory';

interface SummaryViewProps {
    session: TrainingSession;
    onRestart: () => void;
}

export function SummaryView({ session, onRestart }: SummaryViewProps) {
    const total = session.deck.length;
    const correctCount = Object.values(session.results).filter(Boolean).length;
    const percentage = Math.round((correctCount / total) * 100);
    const { addEntry } = useHistory();
    const hasSavedRef = useRef(false);

    useEffect(() => {
        if (!hasSavedRef.current) {
            const level = LEVELS.find(l => l.cardCount === total) || { name: 'Custom' };
            addEntry({
                levelName: level.name,
                cardCount: total,
                correctCount,
                totalCards: total,
                accuracy: percentage
            });
            hasSavedRef.current = true;
        }
    }, [total, correctCount, percentage, addEntry]);

    const missedCards = session.deck.filter(card => session.results[card.id] === false);

    return (
        <div className="flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-500 w-full max-w-4xl pb-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold text-text-main">Session Complete</h2>
                <div className="text-xl text-text-muted">
                    You remembered <span className="text-primary font-bold">{correctCount}</span> / <span className="font-bold">{total}</span>
                </div>
            </div>

            <div className="bg-surface-50 p-8 rounded-2xl border-2 border-surface-200 w-full text-center space-y-2">
                <div className="text-text-muted uppercase tracking-widest font-bold text-xs">Accuracy</div>
                <div className={`text-6xl font-display font-bold ${percentage >= 80 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {percentage}%
                </div>
            </div>

            {missedCards.length > 0 && (
                <div className="w-full space-y-6">
                    <h3 className="text-2xl font-bold text-text-main text-center">Cards to Review</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {missedCards.map(card => (
                            <div key={card.id} className="flex flex-col items-center space-y-2">
                                <div className="scale-75 origin-top">
                                    <PlayingCard card={card} isFaceUp={true} />
                                </div>
                                <span className="text-sm font-bold text-red-400">Missed</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={onRestart}
                className="px-12 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl
        shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
                Train Again
            </button>
        </div>
    );
}
