# Arquitetura do Sistema — Mandato Aberto

## Visão Geral
O **Mandato Aberto** é uma aplicação web de monitoramento cívico que consome diretamente a API de Dados Abertos da Câmara dos Deputados (`https://dadosabertos.camara.leg.br/api/v2`). A arquitetura foi desenhada para garantir neutralidade institucional, clareza visual, resiliência contra falhas de rede e auditoria completa dos dados.

## Camadas da Aplicação

1. **Camada de Apresentação (UI / Componentes)**
   - Desenvolvida em **React 19** com **TypeScript** e **Tailwind CSS**.
   - Design System baseado em princípios institucionais (cores navy e teal, tipografia Inter com números tabulares, sem distintivos morais ou editorialização).
   - Responsiva (adaptada para mobile, tablet e desktop com grid de 12 colunas e docks flutuantes).

2. **Camada de Gerenciamento de Estado & Rotas**
   - Roteamento baseado em hash/estado leve (`/deputados`, `/deputados/:id`, `/comparar`, `/sobre`).
   - Gerenciamento de estado de comparação e preferências persistido via `localStorage`.

3. **Camada de Serviços & Clientes API**
   - Comunicação com a API oficial da Câmara dos Deputados com cache em memória (TTL), tratamento de erros HTTP, tentativas limitadas para falhas transitórias e deduplicação de requisições.
   - Modo de fallback robusto com dados locais/demonstrativos para garantir que a aplicação permaneça funcional caso ocorram instabilidades na API oficial ou bloqueios de CORS.

4. **Camada de Normalização & Agregação**
   - Transformação dos payloads brutos da API em estruturas normalizadas de domínio (Deputado, DespesaCEAP, Proposta, Voto, Presenca, Equipe, Comissao).
   - Cálculos monetários locais seguros e agregação estatística para gráficos e indicadores comparativos.
