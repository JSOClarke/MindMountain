import { useEffect } from 'react';

type KeyMap = Record<string, () => void>;

export function useKeyboard(keyMap: KeyMap) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ignore if typing in an input
            if (
                document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA'
            ) {
                return;
            }

            const action = keyMap[event.key];
            if (action) {
                // Prevent default browser behavior if we are handling the key
                // Unless it's something standard we might not want to block globally, 
                // but for a game/trainer app blocking Space/Arrows is usually good.
                if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                }
                action();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [keyMap]);
}
