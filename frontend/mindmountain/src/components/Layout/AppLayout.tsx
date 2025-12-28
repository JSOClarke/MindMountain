import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SettingsBar } from '../SettingsBar';
import { useSettings } from '../../contexts/SettingsContext';

export function AppLayout() {
    const { theme } = useSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`min-h-screen p-4 md:p-8 flex flex-col items-center transition-colors duration-500 relative
            ${theme.id === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-surface-50 text-text-main'}`}>

            {/* Global Header */}
            <nav className="w-full max-w-5xl flex justify-between items-center mb-6 md:mb-16 relative z-50">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                        MindMountain
                    </Link>

                    {/* Desktop Settings */}
                    <div className="hidden md:block">
                        <SettingsBar />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 -mr-2 text-text-main hover:bg-black/5 rounded-lg transition-colors"
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 p-4 bg-surface-50 border border-surface-200 rounded-2xl shadow-xl md:hidden w-64 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-4">
                            <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Settings</div>
                            <SettingsBar />
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <main className="w-full max-w-4xl flex flex-col items-center flex-grow">
                <Outlet />
            </main>

        </div>
    );
}
