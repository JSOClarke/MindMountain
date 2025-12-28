import { createContext, useContext, useState, type ReactNode } from 'react';
import { type CardTheme, DEFAULT_THEME } from '../lib/types';

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

interface SettingsContextType {
    theme: CardTheme;
    setTheme: (theme: CardTheme) => void;
    animationSpeed: AnimationSpeed;
    setAnimationSpeed: (speed: AnimationSpeed) => void;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<CardTheme>(DEFAULT_THEME);
    const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('normal');
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

    return (
        <SettingsContext.Provider value={{
            theme, setTheme,
            animationSpeed, setAnimationSpeed,
            soundEnabled, setSoundEnabled
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
