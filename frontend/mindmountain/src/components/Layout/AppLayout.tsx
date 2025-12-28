import { Outlet, Link } from 'react-router-dom';
import { SettingsBar } from '../SettingsBar';
import { useSettings } from '../../contexts/SettingsContext';

export function AppLayout() {
    const { theme } = useSettings();

    return (
        <div className={`min-h-screen p-8 flex flex-col items-center transition-colors duration-500 
            ${theme.id === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-surface-50 text-text-main'}`}>

            {/* Global Header */}
            <nav className="w-full max-w-5xl flex justify-between items-center mb-16">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                        MindMountain
                    </Link>
                    <div className="hidden md:block">
                        <SettingsBar />
                    </div>
                </div>

                {/* You can add more global nav items here eventually */}
            </nav>

            {/* Main Content Area */}
            <main className="w-full max-w-4xl flex flex-col items-center flex-grow">
                <Outlet />
            </main>

        </div>
    );
}
