# Persistência e Gerenciamento de Estado — Mandato Aberto

## Estratégia de Dados
- **Fontes Primárias**: API oficial de Dados Abertos da Câmara dos Deputados (`https://dadosabertos.camara.leg.br/api/v2`).
- **Persistência Local (LocalStorage)**:
  - Utilizado **exclusivamente** para armazenar preferências do usuário e a lista de IDs de deputados selecionados para comparação (até 3 deputados).
  - Nenhum grande conjunto de despesas ou notas fiscais é armazenado em localStorage.
- **Modos de Operação**:
  - `api`: Modo principal que busca dados em tempo real da API oficial da Câmara dos Deputados.
  - `local/demo`: Modo com dados estáticos validados para garantir robustez e funcionamento offline ou em caso de indisponibilidade temporária da API.
