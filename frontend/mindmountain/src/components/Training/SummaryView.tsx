import type { TrainingSession } from '../../lib/types';

interface SummaryViewProps {
    session: TrainingSession;
    onRestart: () => void;
}

export function SummaryView({ session, onRestart }: SummaryViewProps) {
    const total = session.deck.length;
    const correctCount = Object.values(session.results).filter(Boolean).length;
    const percentage = Math.round((correctCount / total) * 100);

    return (
        <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
            <h2 className="text-4xl font-display font-bold text-text-main">Session Complete</h2>

            <div className="bg-white p-12 border-2 border-surface-100 shadow-[8px_8px_0px_0px_rgba(45,55,72,0.05)] w-full max-w-md text-center space-y-4">
                <div className="text-text-muted uppercase tracking-widest font-bold text-sm">Your Accuracy</div>
                <div className="text-8xl font-display font-bold text-primary">{percentage}%</div>
                <div className="text-xl text-text-main font-medium">
                    You remembered <span className="text-accent font-bold">{correctCount}</span> out of <span className="font-bold">{total}</span> cards.
                </div>
            </div>

            <button
                onClick={onRestart}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold text-lg 
        shadow-[4px_4px_0px_0px_rgba(45,55,72,0.1)] hover:-translate-y-1 transition-transform cursor-pointer"
            >
                Train Again
            </button>
        </div>
    );
}
