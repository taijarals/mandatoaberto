/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ComparisonDock } from './components/ComparisonDock';
import { DeputadosList } from './components/DeputadosList';
import { DeputadoProfile } from './components/DeputadoProfile';
import { CompararView } from './components/CompararView';
import { SobreView } from './components/SobreView';
import { DeputadoSummary } from './types/deputado';

const COMPARISON_STORAGE_KEY = 'mandato_aberto_comparison_ids';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'deputados' | 'detalhe' | 'comparar' | 'sobre'>('deputados');
  const [selectedDeputyId, setSelectedDeputyId] = useState<number | null>(null);
  
  // Comparison IDs persisted in localStorage as specified
  const [selectedComparisonIds, setSelectedComparisonIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(COMPARISON_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    // Default initial selection matching reference prototypes (e.g. Mariana Vasconcelos [220593] and Carlos Eduardo [204352])
    return [220593, 204352];
  });

  const [comparisonDeputadosSummary, setComparisonDeputadosSummary] = useState<DeputadoSummary[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(selectedComparisonIds));
    } catch (e) {}

    // Fetch summaries for comparison dock items
    if (selectedComparisonIds.length > 0) {
      import('./services/camaraApi').then(({ getDeputados }) => {
        getDeputados().then(all => {
          const matched = all.filter(d => selectedComparisonIds.includes(d.id));
          setComparisonDeputadosSummary(matched);
        });
      });
    } else {
      setComparisonDeputadosSummary([]);
    }
  }, [selectedComparisonIds]);

  const handleNavigate = (tab: string, deputyId?: number) => {
    if (tab === 'detalhe' && deputyId) {
      setSelectedDeputyId(deputyId);
      setCurrentTab('detalhe');
    } else {
      setCurrentTab(tab as any);
      if (tab !== 'detalhe') {
        setSelectedDeputyId(null);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (dep: DeputadoSummary) => {
    setSelectedComparisonIds(prev => {
      if (prev.includes(dep.id)) {
        return prev.filter(id => id !== dep.id);
      } else {
        if (prev.length >= 3) {
          alert('Você pode comparar no máximo 3 deputados simultaneamente.');
          return prev;
        }
        return [...prev, dep.id];
      }
    });
  };

  const handleRemoveCompare = (id: number) => {
    setSelectedComparisonIds(prev => prev.filter(item => item !== id));
  };

  const handleClearCompare = () => {
    setSelectedComparisonIds([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed pb-24 md:pb-12">
      {/* Top Application Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        comparisonCount={selectedComparisonIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'deputados' && (
          <DeputadosList
            onSelectDeputy={(id) => handleNavigate('detalhe', id)}
            selectedComparisonIds={selectedComparisonIds}
            onToggleCompare={handleToggleCompare}
            onGoToCompare={() => handleNavigate('comparar')}
          />
        )}

        {currentTab === 'detalhe' && selectedDeputyId && (
          <DeputadoProfile
            deputyId={selectedDeputyId}
            onBack={() => handleNavigate('deputados')}
            onToggleCompare={handleToggleCompare}
            isComparing={selectedComparisonIds.includes(selectedDeputyId)}
          />
        )}

        {currentTab === 'comparar' && (
          <CompararView
            selectedComparisonIds={selectedComparisonIds}
            onRemoveCompare={handleRemoveCompare}
            onAddMore={() => handleNavigate('deputados')}
            onSelectDeputy={(id) => handleNavigate('detalhe', id)}
          />
        )}

        {currentTab === 'sobre' && (
          <SobreView />
        )}
      </main>

      {/* Persistent Comparison Dock */}
      {selectedComparisonIds.length > 0 && currentTab !== 'comparar' && (
        <ComparisonDock
          selectedDeputados={comparisonDeputadosSummary}
          onRemove={handleRemoveCompare}
          onClear={handleClearCompare}
          onCompare={() => handleNavigate('comparar')}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={handleNavigate}
        comparisonCount={selectedComparisonIds.length}
      />

      {/* Civic Utility Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-16 py-8 text-on-surface-variant font-body-md text-body-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[20px] text-primary">account_balance</span>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Mandato Aberto</span>
          </div>
          <p className="text-caption font-caption text-center md:text-right max-w-2xl text-on-surface-variant leading-relaxed">
            Mandato Aberto — acompanhe seu representante em dados. Este aplicativo é um projeto cívico independente que consome dados abertos oficiais da Câmara dos Deputados sem qualquer inferência ou juízo de valor. Dados extraídos em estrita observância à Lei nº 12.527/2011 (LAI).
          </p>
        </div>
      </footer>
    </div>
  );
}
