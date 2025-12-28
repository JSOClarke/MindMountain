import { useTrainingSession } from './hooks/useTrainingSession';
import { SetupView } from './components/Training/SetupView';
import { MemorizeView } from './components/Training/MemorizeView';
import { ReviewView } from './components/Training/ReviewView';
import { SummaryView } from './components/Training/SummaryView';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { SettingsBar } from './components/SettingsBar';

// We separate InnerApp to access the SettingsContext provided by App
function InnerApp() {
  const { session, startSession, nextCard, recordResult, resetSession } = useTrainingSession();
  const { theme } = useSettings();

  return (
    <div className={`min-h-screen p-8 flex flex-col items-center transition-colors duration-500 ${theme.id === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-surface-50 text-text-main'}`}>

      {/* Header / Nav Area */}
      <nav className="w-full max-w-5xl flex justify-between items-center mb-16">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={resetSession}>
            MindMountain
          </h1>
          <div className="hidden md:block">
            <SettingsBar />
          </div>
        </div>

        <div className="flex gap-4">
          <button className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
            Current Phase: <span className="uppercase font-bold">{session.phase}</span>
          </button>
        </div>
      </nav>

      <main className="w-full max-w-4xl flex flex-col items-center">
        {session.phase === 'setup' && (
          <SetupView
            onStart={startSession}
          />
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
      </main>

    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <InnerApp />
    </SettingsProvider>
  );
}

export default App
