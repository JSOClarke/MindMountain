import { AVAILABLE_THEMES } from '../../lib/types';
import { useSettings } from '../../contexts/SettingsContext';

interface SetupViewProps {
    onStart: (count: number) => void;
}

export function SetupView({ onStart }: SetupViewProps) {
    const {
        theme: currentTheme, setTheme,
        animationSpeed, setAnimationSpeed,
        soundEnabled, setSoundEnabled
    } = useSettings();

    return (
        <div className="flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-300 w-full">

            {/* Card Count Selection */}
            <div className="space-y-6 text-center">
                <h2 className="text-4xl font-display font-bold">Ready to Train?</h2>
                <p className="opacity-60 text-lg max-w-md mx-auto">
                    Select the number of cards you want to memorize today.
                </p>

                <div className="flex gap-4 justify-center">
                    {[3, 5, 10, 52].map(count => (
                        <button
                            key={count}
                            onClick={() => onStart(count)}
                            className="px-8 py-4 bg-white/10 border-2 border-inherit hover:border-primary 
                text-xl font-bold font-display transition-all hover:scale-105 cursor-pointer w-24 h-24 flex items-center justify-center rounded-lg backdrop-blur-sm"
                        >
                            {count}
                        </button>
                    ))}
                </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4 text-center w-full max-w-lg pt-8 border-t border-inherit/20">
                <h3 className="text-xl font-bold uppercase tracking-widest opacity-80">Visual Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                    {AVAILABLE_THEMES.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setTheme(theme)}
                            className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 cursor-pointer
                                ${currentTheme.id === theme.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-transparent bg-inherit hover:bg-white/5'
                                }`}
                        >
                            {/* Theme Preview Circle */}
                            <div className={`w-8 h-8 rounded-full border border-gray-300 shadow-sm ${theme.colors.cardBack}`} />
                            <div className={`w-8 h-8 rounded-full border border-gray-300 shadow-sm -ml-4 ${theme.colors.cardFront}`} />

                            <span className="font-medium ml-2">{theme.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4 text-center w-full max-w-lg pt-8 border-t border-inherit/20">
                <h3 className="text-xl font-bold uppercase tracking-widest opacity-80">Preference</h3>
                <div className="flex gap-4 justify-between">

                    {/* Animation Speed */}
                    <div className="flex-1 flex flex-col gap-2">
                        <span className="text-sm opacity-70 font-medium">Animation Speed</span>
                        <div className="flex bg-black/10 rounded-lg p-1">
                            {(['slow', 'normal', 'fast'] as const).map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => setAnimationSpeed(speed)}
                                    className={`flex-1 py-2 rounded text-sm font-bold capitalize transition-all
                                        ${animationSpeed === speed ? 'bg-white shadow text-black' : 'hover:bg-white/10 opacity-60 hover:opacity-100'}`}
                                >
                                    {speed}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sound Toggle */}
                    <div className="flex-1 flex flex-col gap-2">
                        <span className="text-sm opacity-70 font-medium">Sound Effects</span>
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`flex-1 rounded-lg border-2 font-bold transition-all flex items-center justify-center gap-2
                                ${soundEnabled ? 'border-primary bg-primary/10 text-primary' : 'border-transparent bg-black/10 opacity-60'}`}
                        >
                            <span>{soundEnabled ? '🔊 On' : '🔇 Off'}</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
