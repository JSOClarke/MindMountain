import type { Rank } from '../lib/types';

interface PipLayoutProps {
    rank: Rank;
    symbol: string;
}

export function PipLayout({ rank, symbol }: PipLayoutProps) {
    // Simplified MVP Layout: Single Big Icon centered
    // This relies on the corner indices (handled by PlayingCard parent) for rank identification.

    // Optional: For face cards, we could show the letter, but user asked for "the pip".
    // Let's just show the massive suit symbol for everyone. 
    // It looks clean and abstract.

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-[14rem] leading-none">
                {symbol}
            </div>

            {/* Optional: Rank Overlay for Face Cards if needed? 
                 Let's stick to PURE minimal for now as requested. 
             */}
            {['J', 'Q', 'K', 'A'].includes(rank) && (
                <div className="absolute font-display font-bold text-6xl opacity-40">
                    {rank}
                </div>
            )}
        </div>
    );
}
