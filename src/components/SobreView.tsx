import React from 'react';

export function SobreView() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-6">
      <div className="border-b border-outline-variant pb-6">
        <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
          Transparência Cívica e Dados Públicos
        </span>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mt-1">
          Sobre o Mandato Aberto
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Conheça a origem dos dados, a arquitetura de consulta e o compromisso estrito com a neutralidade informativa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">api</span>
          </div>
          <h2 className="font-headline-sm font-semibold text-primary">Fonte Oficial de Dados</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            O aplicativo consome exclusivamente a API oficial de Dados Abertos da Câmara dos Deputados (<code className="bg-surface-container px-1.5 py-0.5 rounded text-xs">dadosabertos.camara.leg.br</code>). Todas as consultas de despesas, propostas, votações e cadastros são realizadas em tempo real ou mantidas em cache otimizado.
          </p>
        </article>

        <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">balance</span>
          </div>
          <h2 className="font-headline-sm font-semibold text-primary">Neutralidade Institucional</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Em total conformidade com princípios democráticos, o Mandato Aberto não emite notas, não classifica políticos, não atribui medalhas e não utiliza julgamentos morais. A atuação parlamentar é apresentada de forma factual e quantitativa.
          </p>
        </article>

        <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
          </div>
          <h2 className="font-headline-sm font-semibold text-primary">Marco Legal (LAI)</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            O acesso a estas informações é garantido pela Lei de Acesso à Informação (Lei nº 12.527/2011) e pela política de transparência ativa da Câmara dos Deputados, fortalecendo o controle social sobre os mandatos eletivos.
          </p>
        </article>

        <article className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">code</span>
          </div>
          <h2 className="font-headline-sm font-semibold text-primary">Projeto de Código Aberto</h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Desenvolvido sem fins lucrativos, sem anúncios e sem rastreamento publicitário. Utiliza React, TypeScript e Tailwind CSS para proporcionar uma experiência acessível, rápida e segura em computadores e celulares.
          </p>
        </article>
      </div>
    </div>
  );
}
