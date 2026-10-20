import React from 'react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, deputyId?: number) => void;
  comparisonCount: number;
}

export function Navbar({ currentTab, onNavigate, comparisonCount }: NavbarProps) {
  return (
    <header className="bg-surface-container-lowest sticky top-0 z-40 shadow-sm border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-6 py-3 max-w-7xl mx-auto">
        {/* Brand & Public Data Credential */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('deputados')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-surface-bright">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <span className="text-headline-sm font-headline-sm font-semibold text-primary tracking-tight">Mandato Aberto</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">DADOS ABERTOS / CÂMARA DOS DEPUTADOS</span>
            <span className="material-symbols-outlined text-secondary text-[16px] ml-0.5">verified_user</span>
          </div>
        </div>

        {/* Navigation Links (Web Cluster) */}
        <nav className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onNavigate('deputados')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body-md-medium text-body-md-medium transition-colors cursor-pointer ${
              currentTab === 'deputados' || currentTab === 'detalhe'
                ? 'text-primary bg-surface-container'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            <span>Deputados</span>
          </button>

          <button
            onClick={() => onNavigate('comparar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body-md text-body-md transition-colors cursor-pointer ${
              currentTab === 'comparar'
                ? 'text-primary bg-surface-container font-body-md-medium'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            <span>Comparar</span>
            {comparisonCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-primary-container text-surface-bright font-caption text-caption font-bold">
                {comparisonCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('sobre')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body-md text-body-md transition-colors cursor-pointer ${
              currentTab === 'sobre'
                ? 'text-primary bg-surface-container font-body-md-medium'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>Sobre os dados</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
