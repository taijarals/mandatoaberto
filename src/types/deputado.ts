export interface DeputadoSummary {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email?: string;
}

export interface DeputadoDetail extends DeputadoSummary {
  nomeCivil: string;
  sexo?: string;
  urlWebsite?: string;
  redeSocial?: string[];
  dataNascimento?: string;
  falecimento?: string;
  escolaridade?: string;
  municipioNascimento?: string;
  ufNascimento?: string;
  gabinete?: {
    nome: string;
    predio: string;
    sala: string;
    andar: string;
    telefone: string;
    email: string;
  };
  situacao?: {
    condicaoEleitoral: string;
    situacao: string;
    descricaoStatus: string;
    Gabinete?: any;
    data?: string;
    nomeAleatorizado?: boolean;
    filiacaoPolitica?: string;
  };
  // Calculated / Mock metrics for richer dashboard
  gastosTotal2024?: number;
  presencaPercentual?: number;
  propostasCount?: number;
}

export interface DespesaCEAP {
  ano: number;
  mes: number;
  tipoDespesa: string;
  codDocumento?: number;
  tipoDocumento?: string;
  dataDocumento?: string;
  valorDocumento: number;
  valorLiquido: number;
  valorGlosa?: number;
  nomeFornecedor: string;
  cnpjCpfFornecedor: string;
  urlDocumento?: string;
}

export interface Proposicao {
  id: number;
  uri: string;
  siglaTipo: string;
  numero: number;
  ano: number;
  ementa: string;
  dataApresentacao: string;
  situacao?: string;
  tema?: string;
  urlInteiroTeor?: string;
  autor?: string;
  tipoAutoria?: 'Principal' | 'Coautor';
}

export interface VotacaoNominal {
  id: string;
  data: string;
  siglaObjeto?: string;
  proposicaoId?: number;
  proposicaoTitulo?: string;
  descricao: string;
  votoDeputado: 'SIM' | 'NÃO' | 'ABSTENÇÃO' | 'OBSTRUÇÃO' | '-';
  resultadoGeral: 'Aprovado' | 'Rejeitado' | 'Em tramitação' | 'Outro';
  urlOficial?: string;
}

export interface Assessor {
  nome: string;
  cargo: string;
  lotacao: string;
  dataReferencia: string;
}

export interface Comissao {
  id: number;
  sigla: string;
  nome: string;
  tipo: string;
  condicao: 'Titular' | 'Suplente' | 'Presidente' | 'Vice-Presidente';
  dataInicio?: string;
}
