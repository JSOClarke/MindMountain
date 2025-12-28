import { useState } from 'react';
import { LEVELS } from '../../lib/types';

interface SetupViewProps {
    onStart: (count: number) => void;
}

export function SetupView({ onStart }: SetupViewProps) {
    // Default to Level 2 (Beginner / 5 Cards)
    const [selectedLevelId, setSelectedLevelId] = useState(2);

    const selectedLevel = LEVELS.find(l => l.id === selectedLevelId) || LEVELS[0];

    const handleStart = () => {
        onStart(selectedLevel.cardCount);
    };

    return (
        <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-500 w-full">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold text-text-main">Ready to Climb?</h2>
                <p className="text-text-muted text-lg">Select your difficulty level.</p>
            </div>

            {/* Level Selector */}
            <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {LEVELS.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => setSelectedLevelId(level.id)}
                            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left gap-2
                                ${selectedLevelId === level.id
                                    ? 'border-primary bg-surface-100 shadow-md scale-[1.02]'
                                    : 'border-surface-200 hover:border-surface-300 bg-surface-50 opacity-80 hover:opacity-100'}`}
                        >
                            <div className="flex w-full justify-between items-start">
                                <span className={`font-bold text-lg ${selectedLevelId === level.id ? 'text-text-main' : 'text-text-muted'}`}>
                                    {level.name}
                                </span>
                                <span className="text-xl font-display font-bold text-primary">
                                    {level.cardCount}
                                </span>
                            </div>
                            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                                {level.description}
                            </span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleStart}
                    className="w-full py-4 bg-primary text-white text-xl font-bold rounded-xl shadow-lg hover:scale-[1.01] transition-all duration-200"
                >
                    Start Training
                </button>
            </div>

        </div>
    );
}
