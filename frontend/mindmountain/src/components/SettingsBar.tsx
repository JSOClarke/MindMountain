import { useSettings } from '../contexts/SettingsContext';
import { AVAILABLE_THEMES } from '../lib/types';

export function SettingsBar() {
    const {
        theme: currentTheme,
        setTheme,
        animationSpeed,
        setAnimationSpeed,
        soundEnabled,
        setSoundEnabled,
        voiceEnabled,
        setVoiceEnabled
    } = useSettings();

    return (
        <div className="flex gap-6 items-center">
            {/* Theme Selector */}
            <div className="flex gap-3 items-center">
                {AVAILABLE_THEMES.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setTheme(theme)}
                        className={`w-6 h-6 rounded-full border border-black/10 transition-transform hover:scale-110 
                            ${currentTheme.id === theme.id ? 'scale-110 ring-2 ring-offset-2 ring-primary/20' : 'opacity-60 hover:opacity-100'}`}
                        style={{ backgroundColor: theme.id === 'dark' ? '#0f172a' : '#ffffff' }}
                        title={theme.name}
                    />
                ))}
            </div>

            <div className="w-px h-6 bg-current opacity-10" />

            {/* Animation Speed */}
            <div className="flex gap-1">
                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                        key={speed}
                        onClick={() => setAnimationSpeed(speed)}
                        className={`px-2 py-1 text-xs font-bold uppercase tracking-wider transition-colors
                            ${animationSpeed === speed
                                ? 'text-primary'
                                : 'text-text-muted hover:text-text-main opacity-60 hover:opacity-100'}`}
                    >
                        {speed}
                    </button>
                ))}
            </div>

            <div className="w-px h-6 bg-current opacity-10" />

            {/* Sound Toggle */}
            <div className="flex gap-1">
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`transition-colors hover:text-primary 
                        ${soundEnabled ? 'text-text-main' : 'text-text-muted opacity-50'}`}
                    title={soundEnabled ? 'Mute SFX' : 'Unmute SFX'}
                >
                    {soundEnabled ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`transition-colors hover:text-primary 
                        ${voiceEnabled ? 'text-text-main' : 'text-text-muted opacity-50'}`}
                    title={voiceEnabled ? 'Disable Voice' : 'Enable Voice'}
                >
                    {voiceEnabled ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3zM3 3l18 18" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
