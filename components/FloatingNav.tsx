import React from 'react';
import { AppView } from '../types';

interface FloatingNavProps {
  onNavigate: (view: AppView) => void;
  currentView: AppView;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onNavigate, currentView, toggleDarkMode, isDarkMode }) => {
  const isActive = (view: AppView) => currentView === view;

  return (
    <div className="nav-floating animate-in slide-in-from-bottom duration-700 w-full max-w-[calc(100vw-2rem)] sm:max-w-none">
      <div className="glass-card shadow-2xl rounded-full pl-2 pr-2 sm:pl-4 sm:pr-4 py-2.5 sm:py-3 flex items-center justify-center gap-1 sm:gap-3 border border-navy-900/10 transition-all mx-auto w-fit max-w-full">
        <NavItem 
          onClick={() => onNavigate(AppView.LANDING)} 
          active={isActive(AppView.LANDING)}
          label="Home"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
        />
        <NavItem 
          onClick={() => onNavigate(AppView.BLOG)} 
          active={isActive(AppView.BLOG)}
          label="Insights"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v4h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h1" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12h10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16h10" /></svg>}
        />
        <NavItem 
          onClick={() => onNavigate(AppView.DASHBOARD)} 
          active={isActive(AppView.DASHBOARD)}
          label="CRM"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <NavItem 
          onClick={() => onNavigate(AppView.LEAD_MAGNET)} 
          active={isActive(AppView.LEAD_MAGNET)}
          label="Audit"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
        />
        <div className="w-px h-5 sm:h-6 bg-navy-200 dark:bg-navy-700 mx-1 sm:mx-2 shrink-0" />
        <button 
          onClick={toggleDarkMode}
          className="p-2 sm:p-2.5 text-navy-400 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors shrink-0"
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707-.707M6.343 6.343l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
        <button 
          onClick={() => onNavigate(AppView.CHECKOUT)}
          className={`px-3 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all uppercase tracking-widest shrink-0 ${isActive(AppView.CHECKOUT) ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-950 shadow-lg' : 'bg-navy-900 dark:bg-white text-white dark:text-navy-950 hover:shadow-xl hover:scale-105 active:scale-95'}`}
        >
          {isActive(AppView.CHECKOUT) ? 'Paying' : 'Get Fourcee'}
        </button>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ onClick: () => void; active: boolean; label: string; icon: React.ReactNode }> = ({ onClick, active, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 ${active ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-950 shadow-md' : 'text-navy-400 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white'}`}
  >
    {icon}
    {active && <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.15em] animate-in fade-in slide-in-from-left-2 duration-300">{label}</span>}
  </button>
);
