import type { Card } from '../lib/types';
import { PipLayout } from './PipLayout';
import { useSettings } from '../contexts/SettingsContext';

interface PlayingCardProps {
    card: Card;
    isFaceUp: boolean;
    className?: string;
    onClick?: () => void;
    // theme prop removed in favor of context
}

export function PlayingCard({ card, isFaceUp, className = '', onClick }: PlayingCardProps) {
    const { theme } = useSettings();
    const isRed = card.suit === 'Hearts' || card.suit === 'Diamonds';
    const suitColor = isRed ? theme.colors.suitRed : theme.colors.suitBlack;

    const suitSymbols: Record<string, string> = {
        Hearts: '♥',
        Diamonds: '♦',
        Clubs: '♣',
        Spades: '♠'
    };

    const symbol = suitSymbols[card.suit];

    if (!isFaceUp) {
        return (
            <div
                onClick={onClick}
                className={`w-64 h-96 rounded-xl border-4 border-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] 
        flex items-center justify-center cursor-pointer hover:-translate-y-1 transition-transform overflow-hidden relative ${className} ${theme.colors.cardBack}`}
            >
                {/* We are keeping the complex pattern as an inner div for the default look, 
                    but if the theme provided a simple color, this overlay might need adjustment.
                    For MVP theming, we'll assume the theme.colors.cardBack sets the main tone.
                    The existing pattern logic was hardcoded. 
                */}
                <div className="w-full h-full m-2 rounded-lg" style={{
                    backgroundColor: '#9daec8', // This could be parameterized too if we want deep theming
                    backgroundImage: `repeating-linear-gradient(45deg, #8fa0ba 25%, transparent 25%, transparent 75%, #8fa0ba 75%, #8fa0ba), repeating-linear-gradient(45deg, #8fa0ba 25%, #faf9f6 25%, #faf9f6 75%, #8fa0ba 75%, #8fa0ba)`,
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundSize: '20px 20px'
                }} />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full shadow-sm backdrop-blur-sm">
                        <span className="text-primary font-display font-bold text-2xl">MM</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className={`w-64 h-96 rounded-xl border border-surface-200 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] 
      flex flex-col relative select-none overflow-hidden ${className} ${theme.colors.cardFront}`}
        >
            {/* Corner: Top Left */}
            <div className={`absolute top-4 left-4 text-5xl font-bold font-display flex flex-col items-center leading-none ${suitColor}`}>
                <span>{card.rank}</span>
                <span className="text-3xl">{symbol}</span>
            </div>

            {/* Center Content using extracted PipLayout */}
            <div className={`flex-1 flex flex-col justify-center px-4 ${suitColor}`}>
                <PipLayout rank={card.rank} symbol={symbol} />
            </div>

            {/* Corner: Bottom Right (Rotated) */}
            <div className={`absolute bottom-4 right-4 text-5xl font-bold font-display flex flex-col items-center leading-none rotate-180 ${suitColor}`}>
                <span>{card.rank}</span>
                <span className="text-3xl">{symbol}</span>
            </div>
        </div>
    );
}
