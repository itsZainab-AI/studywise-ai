
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: AppView.CONSULTANT, label: 'Study AI', icon: '🎓' },
    { id: AppView.SCHOLARSHIPS, label: 'Scholarships', icon: '💰' },
    { id: AppView.SOP_LOR, label: 'SOP/LOR Expert', icon: '✍️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center md:top-0 md:bottom-auto md:flex-col md:w-64 md:h-full md:justify-start md:pt-12 md:gap-4 md:px-6 z-50">
      <div className="hidden md:block mb-10 w-full text-center">
        <h1 className="text-2xl font-bold text-blue-800">StudyWise AI</h1>
        <p className="text-xs text-slate-500 font-medium">Global Ed-Tech Assistant</p>
      </div>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 py-2 px-3 rounded-xl transition-all w-full md:hover:bg-slate-100 ${
            currentView === item.id ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <span className="text-xl md:text-2xl">{item.icon}</span>
          <span className="text-[10px] md:text-base uppercase tracking-wider md:capitalize md:tracking-normal">
            {item.label}
          </span>
          {currentView === item.id && (
            <div className="md:hidden absolute -top-1 w-1 h-1 bg-blue-600 rounded-full" />
          )}
        </button>
      ))}
    </nav>
  );
};
