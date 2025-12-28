import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-700 w-full max-w-4xl pt-12">

            {/* Intro Text */}
            <div className="text-center max-w-xl mx-auto space-y-4">
                <p className="text-xl text-text-muted font-display font-medium leading-relaxed">
                    Select a discipline to begin your ascent.
                </p>
                <Link to="/history" className="inline-block text-sm font-bold text-primary hover:underline underline-offset-4 uppercase tracking-widest">
                    View Logbook
                </Link>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Memory Cards Game */}
                <Link to="/cards" className="group relative block bg-white border-2 border-surface-200 hover:border-primary transition-all duration-300">
                    <div className="p-8 h-full flex flex-col items-center text-center space-y-6">
                        {/* Minimal Icon */}
                        <div className="w-16 h-16 flex items-center justify-center bg-surface-100 text-3xl group-hover:scale-110 transition-transform duration-300">
                            🃏
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold font-display uppercase tracking-wider">Memory Cards</h3>
                            <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                                The classic system. Memorize a deck of 52 cards using the Method of Loci.
                            </p>
                        </div>

                        {/* Action pseudo-button */}
                        <div className="mt-auto pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-transparent group-hover:border-primary transition-all">
                                Start Training
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Coming Soon Placeholder */}
                <div className="group relative block bg-surface-50 border-2 border-transparent opacity-60 cursor-not-allowed">
                    <div className="p-8 h-full flex flex-col items-center text-center space-y-6 grayscale">
                        <div className="w-16 h-16 flex items-center justify-center bg-surface-200 text-3xl">
                            🔒
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold font-display uppercase tracking-wider">Number Sprint</h3>
                            <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                                Rapid fire digit memorization. Race against the clock.
                            </p>
                        </div>

                        <div className="mt-auto pt-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                                Locked
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
