import { useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

// Singleton context to prevent browser limits (max ~6 contexts usually)
let audioCtx: AudioContext | null = null;

export function useSound() {
    const { soundEnabled } = useSettings();

    const playFlip = useCallback(() => {
        if (!soundEnabled) return;

        try {
            // Lazy initialization on first click (user interaction)
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            // Ensure context is running (browsers suspend it if created before interaction)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const ctx = audioCtx;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            // "Whoosh" effect: Pitch ramp up
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(150, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);

            // Filter: Swipe open
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, ctx.currentTime);
            filter.frequency.linearRampToValueAtTime(3000, ctx.currentTime + 0.1);

            // Envelope: Attack -> Decay (louder: 0.2 gain)
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15); // Decay

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.15);

        } catch (e) {
            console.error("Audio playback failed", e);
        }
    }, [soundEnabled]);

    // A lighter "slide" sound for moving to next card (Paper shuffle / texture)
    const playSwipe = useCallback(() => {
        if (!soundEnabled) return;

        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const ctx = audioCtx;

            // Generate White Noise Buffer for "Paper" Texture
            // 0.1s is enough for a quick slide
            const bufferSize = ctx.sampleRate * 0.1;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const gainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Filter: Bandpass to remove harsh highs and muddy lows, focus on "shh" range
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, ctx.currentTime);
            filter.Q.value = 0.5; // Wide bandwidth

            // Envelope: Fast attack, smooth decay
            // Simulating friction: start soft, peak, end soft
            const t = ctx.currentTime;
            gainNode.gain.setValueAtTime(0, t);
            gainNode.gain.linearRampToValueAtTime(0.15, t + 0.02); // Lower volume than flip
            gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

            noise.start(t);
        } catch (e) { console.error(e); }
    }, [soundEnabled]);

    // "Ding" / Success sound
    const playCorrect = useCallback(() => {
        if (!soundEnabled) return;

        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const ctx = audioCtx;

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.3);
        } catch (e) { console.error(e); }
    }, [soundEnabled]);

    // "Buzz" / Incorrect sound
    const playIncorrect = useCallback(() => {
        if (!soundEnabled) return;

        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const ctx = audioCtx;

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(150, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);

            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
        } catch (e) { console.error(e); }
    }, [soundEnabled]);

    return { playFlip, playSwipe, playCorrect, playIncorrect };
}
