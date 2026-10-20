import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  comparisonCount: number;
}

export function BottomNav({ currentTab, onNavigate, comparisonCount }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-1.5 bg-surface-container-lowest border-t border-outline-variant/60 shadow-md">
      <button
        onClick={() => onNavigate('deputados')}
        className={`flex flex-col items-center justify-center py-1 px-4 transition-all cursor-pointer ${
          currentTab === 'deputados' || currentTab === 'detalhe'
            ? 'text-primary font-semibold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${currentTab === 'deputados' || currentTab === 'detalhe' ? 'fill' : ''}`}>
          groups
        </span>
        <span className="font-label-sm text-label-sm tracking-tight mt-0.5">Deputados</span>
      </button>

      <button
        onClick={() => onNavigate('comparar')}
        className={`flex flex-col items-center justify-center py-1 px-4 relative transition-all cursor-pointer ${
          currentTab === 'comparar'
            ? 'text-primary font-semibold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${currentTab === 'comparar' ? 'fill' : ''}`}>
          compare_arrows
        </span>
        <span className="font-label-sm text-label-sm tracking-tight mt-0.5">Comparar</span>
        {comparisonCount > 0 && (
          <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-primary-container text-surface-bright text-[10px] font-bold flex items-center justify-center">
            {comparisonCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onNavigate('sobre')}
        className={`flex flex-col items-center justify-center py-1 px-4 transition-all cursor-pointer ${
          currentTab === 'sobre'
            ? 'text-primary font-semibold'
            : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className={`material-symbols-outlined text-[22px] ${currentTab === 'sobre' ? 'fill' : ''}`}>
          info
        </span>
        <span className="font-label-sm text-label-sm tracking-tight mt-0.5">Sobre</span>
      </button>
    </nav>
  );
}
