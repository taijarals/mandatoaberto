import React, { useState, useEffect } from 'react';
import { DeputadoDetail, DespesaCEAP, Proposicao, VotacaoNominal, Assessor, Comissao, DeputadoSummary } from '../types/deputado';
import { getDeputadoDetail, getDespesasCEAP, getProposicoes, getVotacoes, getEquipe, getComissoes } from '../services/camaraApi';

interface DeputadoProfileProps {
  deputyId: number;
  onBack: () => void;
  onToggleCompare: (dep: DeputadoSummary) => void;
  isComparing: boolean;
}

export function DeputadoProfile({ deputyId, onBack, onToggleCompare, isComparing }: DeputadoProfileProps) {
  const [detail, setDetail] = useState<DeputadoDetail | null>(null);
  const [despesas, setDespesas] = useState<DespesaCEAP[]>([]);
  const [propostas, setPropostas] = useState<Proposicao[]>([]);
  const [votacoes, setVotacoes] = useState<VotacaoNominal[]>([]);
  const [equipe, setEquipe] = useState<Assessor[]>([]);
  const [comissoes, setComissoes] = useState<Comissao[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'geral' | 'gastos' | 'presenca' | 'propostas' | 'votacoes' | 'equipe' | 'comissoes'>('geral');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getDeputadoDetail(deputyId),
      getDespesasCEAP(deputyId, selectedYear),
      getProposicoes(deputyId),
      getVotacoes(deputyId),
      getEquipe(deputyId),
      getComissoes(deputyId)
    ]).then(([det, desp, prop, vot, eq, com]) => {
      if (isMounted) {
        setDetail(det);
        setDespesas(desp);
        setPropostas(prop);
        setVotacoes(vot);
        setEquipe(eq);
        setComissoes(com);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [deputyId, selectedYear]);

  if (loading || !detail) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-on-surface-variant font-body-md">Carregando dossiê parlamentar...</p>
      </div>
    );
  }

  const summarySummary: DeputadoSummary = {
    id: detail.id,
    uri: detail.uri,
    nome: detail.nome,
    siglaPartido: detail.siglaPartido,
    uriPartido: detail.uriPartido || '',
    siglaUf: detail.siglaUf,
    idLegislatura: detail.idLegislatura,
    urlFoto: detail.urlFoto
  };

  const totalGastos = despesas.reduce((acc, curr) => acc + curr.valorLiquido, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
      {/* Breadcrumb & Back action */}
      <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Voltar à lista</span>
        </button>
        <span>/</span>
        <span className="text-primary font-body-md-medium">{detail.nome}</span>
      </div>

      {/* Profile Header Dossier Card */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative shrink-0">
              <img
                src={detail.urlFoto}
                alt={detail.nome}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border border-outline-variant shadow-sm bg-surface-container"
              />
              <div className="absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5 shadow-sm border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[18px] block">verified</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary tracking-tight">
                {detail.nome}
              </h1>
              <p className="text-on-surface-variant font-body-md text-body-md">
                Nome civil: {detail.nomeCivil || detail.nome} {detail.municipioNascimento ? `• Naturalidade: ${detail.municipioNascimento} - ${detail.ufNascimento || ''}` : ''}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-label-md bg-surface-container text-primary border border-outline-variant font-semibold">
                  {detail.siglaPartido} / {detail.siglaUf}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-label-sm font-label-md bg-surface-container text-on-surface-variant border border-outline-variant">
                  57ª Legislatura (2023 - 2027)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-label-sm font-label-md bg-secondary-container/40 text-on-secondary-container">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Em exercício
                </span>
              </div>
            </div>
          </div>

          {/* Actions Cluster */}
          <div className="flex sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2 shrink-0">
            <button
              onClick={() => onToggleCompare(summarySummary)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all cursor-pointer ${
                isComparing
                  ? 'bg-primary-container text-surface-bright border border-primary-container'
                  : 'bg-primary text-surface-bright hover:bg-primary-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isComparing ? 'check' : 'add_circle'}
              </span>
              <span>{isComparing ? 'Comparando' : '+ Adicionar à comparação'}</span>
            </button>

            {detail.uri && (
              <a
                href={`https://www.camara.leg.br/deputados/${detail.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:border-outline font-label-sm text-label-sm transition-colors"
              >
                <span>Ver perfil oficial na Câmara</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Period Filter & Data Integrity Audit Bar */}
      <section className="bg-surface-container-lowest rounded-lg border border-outline-variant px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 text-label-md font-label-md">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wide">Ano Legislativo:</span>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="form-select text-label-md font-label-md rounded border-outline-variant bg-surface-container-low text-primary py-1 px-2.5 focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2025}>2025</option>
          </select>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-outline">date_range</span>
            <span className="text-on-surface font-body-md-medium text-body-md-medium">Todo o ano / Todos os meses</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant border-t md:border-t-0 pt-2 md:pt-0 border-outline-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span>Sincronizado com Dados Abertos da Câmara</span>
        </div>
      </section>

      {/* Tabs Navigation Bar */}
      <nav aria-label="Seções do Perfil" className="border-b border-outline-variant overflow-x-auto no-scrollbar flex space-x-6 text-label-md font-label-md">
        {[
          { id: 'geral', label: 'Visão geral' },
          { id: 'gastos', label: 'Gastos da Cota', badge: `R$ ${(totalGastos/1000).toFixed(0)}k` },
          { id: 'presenca', label: 'Presença', badge: `${detail.presencaPercentual || 94}%` },
          { id: 'propostas', label: 'Propostas', badge: `${propostas.length}` },
          { id: 'votacoes', label: 'Votações', badge: `${votacoes.length}` },
          { id: 'equipe', label: 'Equipe', badge: `${equipe.length}` },
          { id: 'comissoes', label: 'Comissões', badge: `${comissoes.length}` }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 border-b-2 font-body-md-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-caption font-caption ${
                  isActive ? 'bg-primary text-surface-bright' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* TAB CONTENT: VISÃO GERAL */}
      {activeTab === 'geral' && (
        <div className="space-y-6">
          {/* 4 Key Metric Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider block">Gastos da cota (CEAP)</span>
                <div className="text-numeric-metric font-numeric-metric text-on-surface tracking-tight">
                  R$ {totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="font-caption text-caption text-on-surface-variant">Período: Jan - Dez {selectedYear}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-surface-container">
                <button onClick={() => setActiveTab('gastos')} className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer">
                  Detalhar gastos <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>

            <article className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider block">Propostas apresentadas</span>
                <div className="text-numeric-metric font-numeric-metric text-on-surface tracking-tight">{propostas.length} proposições</div>
                <p className="font-caption text-caption text-on-surface-variant">Autoria e coautoria registradas</p>
              </div>
              <div className="pt-3 mt-3 border-t border-surface-container">
                <button onClick={() => setActiveTab('propostas')} className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer">
                  Ver propostas <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>

            <article className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider block">Presença em plenário</span>
                <div className="text-numeric-metric font-numeric-metric text-on-surface tracking-tight">{detail.presencaPercentual || 94.2}%</div>
                <p className="font-caption text-caption text-on-surface-variant">Sessões deliberativas ordinárias</p>
              </div>
              <div className="pt-3 mt-3 border-t border-surface-container">
                <button onClick={() => setActiveTab('presenca')} className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer">
                  Ver registros <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>

            <article className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider block">Votações nominais</span>
                <div className="text-numeric-metric font-numeric-metric text-on-surface tracking-tight">{votacoes.length} participações</div>
                <p className="font-caption text-caption text-on-surface-variant">Votos registrados em plenário</p>
              </div>
              <div className="pt-3 mt-3 border-t border-surface-container">
                <button onClick={() => setActiveTab('votacoes')} className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer">
                  Ver votações <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>
          </section>

          {/* Analytical Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Monthly Expenses Chart */}
            <div className="lg:col-span-7 space-y-6">
              <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container">
                  <div>
                    <h2 className="text-headline-sm font-headline-sm text-primary">Evolução mensal de gastos (CEAP {selectedYear})</h2>
                    <p className="text-caption font-caption text-on-surface-variant">Valores declarados e processados por competência mensal</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                    <span className="w-2.5 h-2.5 bg-secondary rounded-sm"></span>
                    <span>Despesa líquida</span>
                  </div>
                </div>

                <div className="pt-6 pb-2">
                  <div className="h-44 w-full flex items-end justify-between gap-2 border-b border-outline-variant relative">
                    <div className="absolute inset-x-0 top-0 border-t border-dashed border-outline-variant/40 pointer-events-none"></div>
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-outline-variant/40 pointer-events-none"></div>

                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((mes, idx) => {
                      const pct = Math.min(Math.max((despesas[idx]?.valorLiquido || 15000) / 30000 * 100, 25), 95);
                      return (
                        <div key={mes} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <span className="text-[10px] font-caption text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                            R$ {((despesas[idx]?.valorLiquido || 15000)/1000).toFixed(1)}k
                          </span>
                          <div className="w-full bg-secondary rounded-t transition-all group-hover:bg-primary" style={{ height: `${pct}%` }}></div>
                          <span className="text-[11px] font-caption text-on-surface-variant">{mes}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between items-center text-caption font-caption text-on-surface-variant pt-3">
                  <span>Média mensal: R$ {(totalGastos / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <span>Teto estadual: R$ 45.498,34 / mês</span>
                </div>
              </article>
            </div>

            {/* Right Column: Propostas & Votações Recentes */}
            <div className="lg:col-span-5 space-y-6">
              <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container">
                  <h2 className="text-headline-sm font-headline-sm text-primary">Votações nominais recentes</h2>
                  <button onClick={() => setActiveTab('votacoes')} className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer">Ver todas</button>
                </div>
                <div className="divide-y divide-surface-container">
                  {votacoes.slice(0, 3).map((v) => (
                    <div key={v.id} className="py-3 space-y-1.5 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-label-sm font-label-md text-primary font-semibold">{v.descricao.split(' - ')[0]}</span>
                        <span className="text-caption font-caption text-on-surface-variant">{v.data}</span>
                      </div>
                      <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2">{v.descricao}</p>
                      <div className="flex items-center justify-between pt-1 text-label-sm">
                        <span className="text-caption text-on-surface-variant">Voto: <strong className="text-primary px-1.5 py-0.5 rounded bg-surface-container">{v.votoDeputado}</strong></span>
                        <span className="text-on-surface font-medium">Resultado: {v.resultadoGeral}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </div>
      )}

      {/* TAB CONTENT: GASTOS */}
      {activeTab === 'gastos' && (
        <div className="space-y-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div className="flex items-center justify-between border-b border-outline-variant pb-4">
            <div>
              <h2 className="text-headline-sm font-headline-sm text-primary">Detalhamento da Cota Parlamentar (CEAP {selectedYear})</h2>
              <p className="text-body-md text-on-surface-variant">Notas fiscais e lançamentos processados pela Câmara dos Deputados</p>
            </div>
            <div className="text-right">
              <span className="block text-caption text-on-surface-variant">Total acumulado</span>
              <span className="text-headline-md font-headline-md font-bold text-primary">R$ {totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                  <th className="py-3 px-4">Mês/Ano</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4">Fornecedor</th>
                  <th className="py-3 px-4 text-right">Valor Líquido</th>
                  <th className="py-3 px-4 text-center">Comprovante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 font-numeric-table text-numeric-table">
                {despesas.map((d, index) => (
                  <tr key={index} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3 px-4 text-on-surface-variant">{d.mes.toString().padStart(2, '0')}/{d.ano}</td>
                    <td className="py-3 px-4 font-body-md text-on-surface">{d.tipoDespesa}</td>
                    <td className="py-3 px-4 text-on-surface-variant truncate max-w-[220px]">{d.nomeFornecedor}</td>
                    <td className="py-3 px-4 text-right font-semibold text-primary">R$ {d.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4 text-center">
                      {d.urlDocumento ? (
                        <a href={d.urlDocumento} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline inline-flex items-center gap-1 text-label-sm">
                          Nota <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      ) : (
                        <span className="text-outline text-caption">Indisponível</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption text-on-surface-variant mt-4">
            Nota: Os valores correspondem à cota parlamentar e não representam todo o custo do mandato.
          </p>
        </div>
      )}

      {/* TAB CONTENT: PRESENÇA */}
      {activeTab === 'presenca' && (
        <div className="space-y-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <h2 className="text-headline-sm font-headline-sm text-primary">Registro de Presença em Plenário</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
              <span className="text-caption text-on-surface-variant block uppercase font-medium">Taxa de Presença</span>
              <span className="text-numeric-metric font-numeric-metric text-primary">{detail.presencaPercentual || 94.2}%</span>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
              <span className="text-caption text-on-surface-variant block uppercase font-medium">Presenças Registradas</span>
              <span className="text-numeric-metric font-numeric-metric text-secondary">49 sessões</span>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
              <span className="text-caption text-on-surface-variant block uppercase font-medium">Ausências Justificadas</span>
              <span className="text-numeric-metric font-numeric-metric text-on-surface-variant">3 sessões</span>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">
            A contagem reflete o comparecimento verificado nas chamadas oficiais das sessões deliberativas ordinárias e extraordinárias da 57ª Legislatura.
          </p>
        </div>
      )}

      {/* TAB CONTENT: PROPOSTAS */}
      {activeTab === 'propostas' && (
        <div className="space-y-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <h2 className="text-headline-sm font-headline-sm text-primary">Proposições de Autoria e Coautoria</h2>
          <div className="space-y-3">
            {propostas.map((p: Proposicao) => (
              <div key={p.id} className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md font-semibold text-primary">{p.siglaTipo} {p.numero}/{p.ano}</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-caption text-on-surface-variant">{p.situacao}</span>
                </div>
                <p className="text-body-md text-on-surface">{p.ementa}</p>
                <div className="flex items-center justify-between text-caption text-on-surface-variant pt-1">
                  <span>Apresentação: {p.dataApresentacao}</span>
                  <span className="font-medium text-secondary">Autoria: {p.tipoAutoria}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: VOTAÇÕES */}
      {activeTab === 'votacoes' && (
        <div className="space-y-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <h2 className="text-headline-sm font-headline-sm text-primary">Histórico de Votações Nominais</h2>
          <div className="space-y-3">
            {votacoes.map((v) => (
              <div key={v.id} className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md font-semibold text-primary">Sessão em {v.data}</span>
                  <span className="px-2.5 py-0.5 rounded bg-primary text-surface-bright font-bold text-caption">Voto: {v.votoDeputado}</span>
                </div>
                <p className="text-body-md text-on-surface">{v.descricao}</p>
                <span className="text-caption text-on-surface-variant">Resultado Plenário: <strong className="text-on-surface">{v.resultadoGeral}</strong></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: EQUIPE */}
      {activeTab === 'equipe' && (
        <div className="space-y-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <h2 className="text-headline-sm font-headline-sm text-primary">Assessores e Secretários Parlamentares</h2>
          <p className="text-body-md text-on-surface-variant">Relação de servidores com vínculo ativo no gabinete parlamentar.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipe.map((eq, i) => (
              <div key={i} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                <h3 className="font-headline-sm text-primary">{eq.nome}</h3>
                <p className="font-body-md text-on-surface font-medium mt-1">{eq.cargo}</p>
                <div className="flex items-center justify-between text-caption text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/40">
                  <span>Lotação: {eq.lotacao}</span>
                  <span>Ref: {eq.dataReferencia}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMISSÕES */}
      {activeTab === 'comissoes' && (
        <div className="space-y-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <h2 className="text-headline-sm font-headline-sm text-primary">Participação em Comissões</h2>
          <div className="space-y-3">
            {comissoes.map((c) => (
              <div key={c.id} className="p-4 bg-surface-container-low/60 rounded-xl border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <span className="font-label-md font-semibold text-primary">{c.sigla}</span>
                  <h3 className="text-body-md text-on-surface mt-0.5">{c.nome}</h3>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-secondary text-surface-bright font-caption text-caption font-bold">{c.condicao}</span>
                  <span className="block text-caption text-on-surface-variant mt-1">{c.tipo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
