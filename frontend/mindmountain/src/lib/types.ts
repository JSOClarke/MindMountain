export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
    id: string; // e.g. "hearts-10"
    suit: Suit;
    rank: Rank;
}

export type TrainingPhase = 'setup' | 'memorize' | 'review' | 'summary';

export interface TrainingSession {
    phase: TrainingPhase;
    deck: Card[];
    currentIndex: number;
    results: Record<string, boolean>; // cardId -> wasCorrect
}

export interface CardTheme {
    id: string;
    name: string;
    colors: {
        suitRed: string;   // Tailwind class for red suits
        suitBlack: string; // Tailwind class for black suits
        cardFront: string; // Tailwind class for card background (front)
        cardBack: string;  // Tailwind class for card background (back)
    };
    // Optional: If we want to support custom renderers for patterns later
    // backPattern?: (props: any) => React.ReactNode; 
}

export const DEFAULT_THEME: CardTheme = {
    id: 'default',
    name: 'MindMountain Minimal',
    colors: {
        suitRed: 'text-red-500',
        suitBlack: 'text-slate-800',
        cardFront: 'bg-white',
        cardBack: 'bg-[#faf9f6]', // Off-white container for the back pattern
    }
};

export const DARK_THEME: CardTheme = {
    id: 'dark',
    name: 'Midnight Zen',
    colors: {
        suitRed: 'text-pink-400',
        suitBlack: 'text-slate-200',
        cardFront: 'bg-slate-900',
        cardBack: 'bg-slate-950',
    }
};

export const AVAILABLE_THEMES = [DEFAULT_THEME, DARK_THEME];
