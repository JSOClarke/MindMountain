import { useTrainingSession } from '../hooks/useTrainingSession';
import { SetupView } from '../components/Training/SetupView';
import { MemorizeView } from '../components/Training/MemorizeView';
import { ReviewView } from '../components/Training/ReviewView';
import { SummaryView } from '../components/Training/SummaryView';

export function CardTraining() {
    const { session, startSession, nextCard, recordResult, resetSession } = useTrainingSession();

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex gap-4 mb-8">
                <button className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
                    Current Phase: <span className="uppercase font-bold">{session.phase}</span>
                </button>
            </div>

            {session.phase === 'setup' && (
                <SetupView onStart={startSession} />
            )}

            {session.phase === 'memorize' && (
                <MemorizeView
                    card={session.deck[session.currentIndex]}
                    index={session.currentIndex}
                    total={session.deck.length}
                    onNext={nextCard}
                />
            )}

            {session.phase === 'review' && (
                <ReviewView
                    key={session.currentIndex}
                    card={session.deck[session.currentIndex]}
                    deck={session.deck}
                    index={session.currentIndex}
                    total={session.deck.length}
                    onResult={recordResult}
                />
            )}

            {session.phase === 'summary' && (
                <SummaryView session={session} onRestart={resetSession} />
            )}
        </div>
    );
}
