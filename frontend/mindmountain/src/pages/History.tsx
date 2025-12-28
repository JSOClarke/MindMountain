import { useHistory } from '../hooks/useHistory';

function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(timestamp));
}

export function History() {
    const { history, clearHistory } = useHistory();

    return (
        <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in duration-500 space-y-8 pt-8">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-display font-bold text-text-main">Ascension Log</h1>
                {history.length > 0 && (
                    <button
                        onClick={confirm('Delete all history?') ? clearHistory : undefined}
                        className="text-xs text-red-400 hover:text-red-500 uppercase font-bold tracking-widest transition-colors"
                    >
                        Clear Log
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center py-16 text-text-muted border-2 border-dashed border-surface-200 rounded-2xl w-full">
                    <p>No expeditions recorded yet.</p>
                </div>
            ) : (
                <div className="w-full space-y-4">
                    {history.map((entry) => (
                        <div key={entry.id} className="bg-surface-50 border border-surface-200 p-6 rounded-xl flex items-center justify-between hover:border-surface-200/80 transition-colors">
                            <div className="space-y-1">
                                <div className="font-bold text-text-main flex items-center gap-2">
                                    {entry.levelName}
                                    <span className="text-xs font-normal text-text-muted bg-surface-200 px-2 py-0.5 rounded-full">
                                        {entry.cardCount} Cards
                                    </span>
                                </div>
                                <div className="text-sm text-text-muted">
                                    {formatDate(entry.timestamp)}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className={`text-2xl font-bold font-display
                                    ${entry.accuracy >= 80 ? 'text-green-500' : entry.accuracy >= 50 ? 'text-yellow-500' : 'text-red-500'}
                                `}>
                                    {entry.accuracy}%
                                </div>
                                <div className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                    Accuracy
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
