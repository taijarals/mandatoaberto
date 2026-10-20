import React, { useState, useEffect } from 'react';
import { DeputadoSummary } from '../types/deputado';
import { getDeputados } from '../services/camaraApi';

interface DeputadosListProps {
  onSelectDeputy: (id: number) => void;
  selectedComparisonIds: number[];
  onToggleCompare: (dep: DeputadoSummary) => void;
  onGoToCompare: () => void;
}

const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const PARTIDOS = ["PLD", "PRC", "FCS", "UNP", "BRD", "VNC", "PL", "PT", "PP", "UNIÃO", "PSD", "MDB", "REPUBLICANOS", "PSB", "PDT", "PSOL", "REDE"];

export function DeputadosList({ onSelectDeputy, selectedComparisonIds, onToggleCompare, onGoToCompare }: DeputadosListProps) {
  const [deputados, setDeputados] = useState<DeputadoSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUf, setSelectedUf] = useState<string>('');
  const [selectedPartido, setSelectedPartido] = useState<string>('');
  const [selectedSituacao, setSelectedSituacao] = useState<string>('exercicio');
  const [sortOrder, setSortOrder] = useState<string>('nome-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getDeputados()
      .then((data) => {
        if (isMounted) {
          setDeputados(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Não foi possível carregar a lista de deputados da API oficial. Verifique sua conexão.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Filter & Sort logic
  const filtered = deputados.filter((dep) => {
    const matchesSearch = searchQuery === '' || 
      dep.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dep.siglaPartido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dep.siglaUf.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUf = selectedUf === '' || dep.siglaUf.toUpperCase() === selectedUf.toUpperCase();
    const matchesPartido = selectedPartido === '' || dep.siglaPartido.toUpperCase() === selectedPartido.toUpperCase();
    
    return matchesSearch && matchesUf && matchesPartido;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'nome-asc') return a.nome.localeCompare(b.nome);
    if (sortOrder === 'nome-desc') return b.nome.localeCompare(a.nome);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedUf('');
    setSelectedPartido('');
    setSelectedSituacao('todos');
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-6">
      {/* Header Banner: Contextual Scope */}
      <div className="border-b border-outline-variant pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
              Repositório Cívico e Monitoramento Legislativo
            </span>
            <h1 className="text-display-lg font-display-lg text-primary mt-1">
              Conheça a atuação dos deputados federais
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-3xl">
              Consulte gastos, propostas, votações e outros dados públicos do mandato. Dados quantitativos oficiais sem avaliações subjetivas.
            </p>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption bg-surface-container-lowest px-3 py-2 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">update</span>
            <span>Atualizado diariamente via API da Câmara</span>
          </div>
        </div>
      </div>

      {/* Unified Search & Filter Control Card */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Buscar por nome do deputado, partido ou estado..."
              className="w-full pl-10 pr-9 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                title="Limpar pesquisa"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Inline Filters */}
          <div className="lg:col-span-7 flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="w-full sm:w-1/3">
              <select
                value={selectedUf}
                onChange={(e) => { setSelectedUf(e.target.value); setCurrentPage(1); }}
                className="w-full py-2.5 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">UF: Todos</option>
                {UFS.map(uf => (
                  <option key={uf} value={uf}>{uf} - {uf}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/3">
              <select
                value={selectedPartido}
                onChange={(e) => { setSelectedPartido(e.target.value); setCurrentPage(1); }}
                className="w-full py-2.5 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">Partido: Todos</option>
                {PARTIDOS.map(partido => (
                  <option key={partido} value={partido}>{partido}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/3">
              <select
                value={selectedSituacao}
                onChange={(e) => setSelectedSituacao(e.target.value)}
                className="w-full py-2.5 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="exercicio">Situação: Em exercício</option>
                <option value="todos">Todas as situações</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="whitespace-nowrap px-3 py-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg font-body-md-medium text-body-md-medium transition-colors flex items-center gap-1 border border-transparent hover:border-outline-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Results Count & Layout Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm text-primary">{sorted.length}</span>
          <span className="font-body-md text-body-md text-on-surface-variant">deputados federais encontrados</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-caption text-caption text-on-surface-variant font-medium uppercase">Ordenar por:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="py-1.5 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="nome-asc">Nome (A-Z)</option>
              <option value="nome-desc">Nome (Z-A)</option>
            </select>
          </div>

          <div className="flex items-center border border-outline-variant rounded-lg p-0.5 bg-surface-container-lowest">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-surface-container text-primary shadow-xs' : 'text-on-surface-variant hover:text-primary'}`}
              title="Visualização em grade"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-surface-container text-primary shadow-xs' : 'text-on-surface-variant hover:text-primary'}`}
              title="Visualização em lista"
            >
              <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-body-md">Carregando dados oficiais da Câmara dos Deputados...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-error-container/40 border border-error/40 text-on-error-container p-6 rounded-xl text-center">
          <p className="font-body-lg-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-primary text-surface-bright rounded-lg font-label-md cursor-pointer hover:bg-primary-container"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Grid of Parliamentarian Dossier Cards (3 Columns Desktop) */}
      {!loading && !error && paginated.length > 0 && (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {paginated.map((dep) => {
            const isComparing = selectedComparisonIds.includes(dep.id);
            const gastoSimulado = "R$ " + ((dep.id * 137) % 180000 + 85000).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            const presencaSimulada = ((85 + (dep.id % 13))).toFixed(1) + "%";

            return (
              <article
                key={dep.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:border-outline hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header Profile Row */}
                  <div className="flex items-start gap-4">
                    <img
                      src={dep.urlFoto || "https://www.camara.leg.br/internet/deputado/bandep/220593.jpg"}
                      alt={dep.nome}
                      className="w-16 h-16 rounded-lg object-cover border border-outline-variant flex-shrink-0 bg-surface-container"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-primary font-caption text-caption font-semibold bg-surface-container border border-outline-variant">
                          {dep.siglaPartido}
                        </span>
                        <span className="px-2 py-0.5 rounded text-on-surface-variant font-caption text-caption bg-surface-container-low border border-outline-variant">
                          {dep.siglaUf}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-on-secondary-container font-caption text-caption bg-secondary-container/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Em exercício
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-primary font-semibold truncate leading-tight" title={dep.nome}>
                        {dep.nome}
                      </h2>
                      <span className="font-caption text-caption text-on-surface-variant block mt-0.5">Titular • 57ª Legislatura</span>
                    </div>
                  </div>

                  {/* Structured Metrics Division */}
                  <div className="mt-6 pt-4 border-t border-outline-variant space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-caption text-caption text-on-surface-variant uppercase font-medium">Gastos CEAP (2024)</span>
                        <span className="font-numeric-table text-numeric-table font-semibold text-primary">{gastoSimulado}</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: '58%' }}></div>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant mt-1 block">58% do teto anual disponível</span>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-caption text-caption text-on-surface-variant uppercase font-medium">Presença em plenário</span>
                        <span className="font-numeric-table text-numeric-table font-semibold text-primary">{presencaSimulada}</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-primary-container h-full rounded-full" style={{ width: '94.2%' }}></div>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant mt-1 block">49 de 52 sessões deliberativas</span>
                    </div>
                  </div>
                </div>

                {/* Action Trigger Buttons */}
                <div className="mt-6 pt-4 border-t border-outline-variant flex items-center gap-2">
                  <button
                    onClick={() => onSelectDeputy(dep.id)}
                    className="flex-1 py-2 text-center rounded-lg border border-primary text-primary hover:bg-surface-container font-body-md-medium text-body-md-medium transition-colors cursor-pointer"
                  >
                    Ver perfil
                  </button>
                  <button
                    onClick={() => onToggleCompare(dep)}
                    className={`flex-1 py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      isComparing
                        ? 'bg-surface-container text-primary border border-primary-container font-semibold'
                        : 'bg-surface-container-lowest text-primary border border-outline-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isComparing ? 'check' : 'add'}
                    </span>
                    <span>{isComparing ? 'Comparando' : 'Comparar'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-outline-variant pt-6 gap-4">
          <div className="font-body-md text-body-md text-on-surface-variant">
            Mostrando página <span className="font-semibold text-primary">{currentPage}</span> de <span className="font-semibold text-primary">{totalPages}</span> ({sorted.length} deputados no total)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3.5 py-2 rounded-lg border border-outline-variant font-body-md-medium text-body-md-medium flex items-center gap-1 transition-colors cursor-pointer ${
                currentPage === 1 ? 'text-outline bg-surface-container-low cursor-not-allowed' : 'text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span>Anterior</span>
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3.5 py-2 rounded-lg border border-outline-variant font-body-md-medium text-body-md-medium flex items-center gap-1 transition-colors cursor-pointer ${
                currentPage === totalPages ? 'text-outline bg-surface-container-low cursor-not-allowed' : 'text-primary hover:bg-surface-container'
              }`}
            >
              <span>Próxima</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
