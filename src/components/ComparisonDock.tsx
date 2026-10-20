import React from 'react';
import { DeputadoSummary } from '../types/deputado';

interface ComparisonDockProps {
  selectedDeputados: DeputadoSummary[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onCompare: () => void;
}

export function ComparisonDock({ selectedDeputados, onRemove, onClear, onCompare }: ComparisonDockProps) {
  if (selectedDeputados.length === 0) return null;

  return (
    <aside className="fixed bottom-[56px] md:bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_16px_rgba(15,23,42,0.1)] px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Pinned items slot */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-md text-label-md text-primary font-semibold">
              Comparando {selectedDeputados.length} de 3 deputados
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {selectedDeputados.map((dep) => (
              <div key={dep.id} className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface">
                <img 
                  src={dep.urlFoto} 
                  alt={dep.nome} 
                  className="w-6 h-6 rounded-full object-cover border border-outline-variant" 
                />
                <span className="font-label-sm text-label-sm font-medium truncate max-w-[120px] sm:max-w-[160px]">
                  {dep.nome.split(' ')[0]} {dep.nome.split(' ').slice(-1)[0]} ({dep.siglaPartido}/{dep.siglaUf})
                </span>
                <button 
                  onClick={() => onRemove(dep.id)}
                  className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                  title="Remover"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}

            {selectedDeputados.length < 3 && (
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-outline text-outline font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Adicionar outro</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Primary Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={onClear}
            className="text-on-surface-variant hover:text-error font-body-md text-body-md underline transition-colors cursor-pointer text-xs sm:text-sm"
          >
            Limpar lista
          </button>
          
          <button 
            onClick={onCompare}
            className="flex-1 sm:flex-initial bg-primary hover:bg-primary-container text-surface-bright font-label-md text-label-md px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            <span>Comparar deputados ({selectedDeputados.length})</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
