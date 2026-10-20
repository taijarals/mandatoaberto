# Modelo de Dados — Mandato Aberto

## Entidades Principais

### 1. Deputado (ParliamentarianSummary / ParliamentarianDetail)
- `id`: Identificador único oficial da Câmara (`string` ou `number`).
- `uri`: URL oficial na API da Câmara.
- `nome`: Nome parlamentar.
- `nomeCivil`: Nome civil completo.
- `siglaPartido`: Sigla do partido político (ex: PLD, PRC, etc.).
- `siglaUf`: Unidade Federativa de representação (ex: SP, CE, RJ).
- `urlFoto`: URL oficial da foto de perfil.
- `situacao`: Situação atual do exercício (Ex: "Em exercício", "Licenciado", "Suplente").
- `legislatura`: Número da legislatura (ex: 57).
- `email`: E-mail oficial de contato institucional.
- `gabinete`: Informações de sala, prédio e telefone.

### 2. DespesaCEAP (Cota para o Exercício da Atividade Parlamentar)
- `ano`: Ano de competência.
- `mes`: Mês de competência.
- `tipoDespesa`: Categoria da despesa (ex: Passagens aéreas, Divulgação, Locação).
- `fornecedor`: Nome ou razão social do fornecedor / credor.
- `cnpjCpfFornecedor`: Documento do fornecedor.
- `valorLiquido`: Valor líquido da despesa em centavos inteiros ou formato decimal (BRL).
- `urlDocumento`: Link para nota fiscal ou comprovante oficial.

### 3. Proposta (Proposicao)
- `id`: ID da proposição.
- `siglaTipo`: Tipo (PL, PEC, MPV, PDC).
- `numero`: Número oficial.
- `ano`: Ano de apresentação.
- `ementa`: Descrição / objetivo da proposição.
- `dataApresentacao`: Data de protocolo.
- `situacao`: Situação atual da tramitação.
- `urlInteiroTeor`: Link para leitura do documento completo.

### 4. Votacao & VotoIndividual
- `id`: ID da votação nominal.
- `data`: Data e hora da sessão.
- `descricao`: Objeto da votação.
- `votoDeputado`: Sentido do voto individual ("SIM", "NÃO", "ABSTENÇÃO", "OBSTRUÇÃO").
- `resultadoGeral`: Resultado consolidado da votação no plenário.

### 5. Equipe (Secretários Parlamentares) & Comissões
- `nome`: Nome do assessor.
- `cargo`: Função exercida na lotação.
- `comissao`: Nome, sigla, tipo e condição (titular/suplente) em comissões permanentes ou temporárias.
