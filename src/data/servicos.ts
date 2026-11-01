import { Sprout, HeartHandshake, ShieldCheck, Scale } from 'lucide-react';

export interface Servico {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
  itens: string[];
  exemploCaso: {
    titulo: string;
    resumo: string;
    resultado: string;
  };
  metricaDestaque: string;
  linkWhats: string;
  icon: any;
}

const WHATS_NUMBER = "5562999999999";

const criarLinkWhatsArea = (area: string) =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
    `Olá! Vim pelo site do Escritório de Advocacia e gostaria de atendimento especialista em ${area}.`
  )}`;

export const servicos: Servico[] = [
  {
    id: 'agrario',
    titulo: 'Direito Agrário e Agronegócio',
    subtitulo: 'Segurança jurídica para o produtor rural, fazendas e empresas do agro',
    descricao:
      'Atuação estratégica do plantio à comercialização: regularização fundiária, contratos de arrendamento e parceria rural, renegociação de crédito rural, defesa ambiental (CAR/IBAMA) e proteção possessória.',
    imagem: 'images/direito-agrario-lavoura.jpg',
    imagemAlt: 'Colheitadeiras em lavoura ao pôr do sol representando Direito Agrário e Agronegócio em Goiás',
    itens: [
      'Contratos de Arrendamento, Parceria Rural e Compra e Venda de Safra',
      'Regularização Fundiária, Usucapião Rural, Georreferenciamento e Retificação de Área',
      'Alongamento e Revisão de Dívidas de Crédito Rural e Cédulas de Produto Rural (CPR)',
      'Defesa em Autos de Infração Ambiental, Embargos e Licenciamento',
      'Ações Possessórias (Reintegração e Manutenção de Posse) e blindagem patrimonial da fazenda'
    ],
    exemploCaso: {
      titulo: 'Reestruturação de Passivo Agrícola e Regularização de Propriedade Rural',
      resumo:
        'Atuação técnica na suspensão de leilão de imóvel rural produtivo combinada ao alongamento de crédito de custeio e regularização documental de matrícula.',
      resultado: 'Preservação integral da lavoura e redução de encargos abusivos.'
    },
    metricaDestaque: 'Proteção integral da propriedade e da produção rural',
    linkWhats: criarLinkWhatsArea('Direito Agrário e Agronegócio'),
    icon: Sprout
  },
  {
    id: 'familia',
    titulo: 'Vara de Família e Sucessões',
    subtitulo: 'Soluções humanas, discretas e firmes para proteger sua família e seu patrimônio',
    descricao:
      'Condução sensível e estratégica em divórcios consensuais ou litigiosos, pensão alimentícia, guarda compartilhada, inventários judiciais/extrajudiciais e planejamento sucessório familiar e rural.',
    imagem: 'images/previdenciario-protecao.jpg',
    imagemAlt: 'Proteção familiar e patrimonial representando atuação em Vara de Família e Sucessões',
    itens: [
      'Divórcio Judicial e Extrajudicial em Cartório (rápido e sigiloso)',
      'Fixação, Revisão, Exoneração e Execução de Pensão Alimentícia',
      'Guarda de Filhos, Regulamentação de Convivência e Reconhecimento/Dissolução de União Estável',
      'Inventário, Partilha de Bens Urbanos e Rurais e Holding Familiar',
      'Medidas Protetivas e Blindagem Patrimonial Familiar'
    ],
    exemploCaso: {
      titulo: 'Inventário Extrajudicial e Partilha de Patrimônio Urbano e Rural',
      resumo:
        'Mediação entre herdeiros para destravar espólio com propriedades rurais e bens urbanos sem necessidade de longo litígio judicial.',
      resultado: 'Conclusão célere em cartório com economia tributária e preservação da harmonia familiar.'
    },
    metricaDestaque: 'Sigilo absoluto e agilidade em acordos e litígios familiares',
    linkWhats: criarLinkWhatsArea('Vara de Família e Sucessões'),
    icon: HeartHandshake
  },
  {
    id: 'previdenciario',
    titulo: 'Direito Previdenciário (INSS)',
    subtitulo: 'Conquista e revisão do melhor benefício para trabalhadores urbanos e rurais',
    descricao:
      'Análise minuciosa do histórico contributivo e tempo rural para garantir aposentadorias, auxílio-doença, BPC/LOAS, pensão por morte e revisão de valores negados ou pagos a menor pelo INSS.',
    imagem: 'images/previdenciario-aposentadoria-familia.jpg',
    imagemAlt: 'Casal protegido com moedas crescentes simbolizando Direito Previdenciário e Aposentadoria pelo INSS',
    itens: [
      'Aposentadoria por Idade, Tempo de Contribuição, Especial e Aposentadoria Rural (Híbrida)',
      'Auxílio por Incapacidade Temporária (Auxílio-Doença) e Aposentadoria por Invalidez',
      'Benefício Assistencial BPC/LOAS para Idosos e Pessoas com Deficiência',
      'Pensão por Morte e Reconhecimento de União Estável perante o INSS',
      'Planejamento Previdenciário e Recursos contra Indeferimento do INSS'
    ],
    exemploCaso: {
      titulo: 'Concessão de Aposentadoria Híbrida com Averbação de Tempo Rural',
      resumo:
        'Reversão judicial de negativa do INSS mediante comprovação documental e testemunhal de período trabalhado em regime de economia familiar no campo.',
      resultado: 'Implantação do benefício vitalício + pagamento integral dos valores atrasados.'
    },
    metricaDestaque: 'Cálculo preciso para garantir o teto possível do seu benefício',
    linkWhats: criarLinkWhatsArea('Direito Previdenciário (INSS)'),
    icon: ShieldCheck
  },
  {
    id: 'criminal',
    titulo: 'Direito Criminal e Defesa Penal',
    subtitulo: 'Defesa técnica intransigente da liberdade, da honra e do devido processo legal',
    descricao:
      'Atuação imediata 24h em delegacias, flagrantes e audiências de custódia, além de defesa especializada em inquéritos policiais, processos criminais, Tribunal do Júri, crimes ambientais e agrários.',
    imagem: 'images/balanca-justica-escritorio.jpg',
    imagemAlt: 'Balança da justiça dourada iluminada em biblioteca jurídica clássica representando Direito Criminal',
    itens: [
      'Acompanhamento 24h em Flagrantes, Delegacias e Audiências de Custódia',
      'Pedidos de Liberdade Provisória, Revogação de Prisão e Habeas Corpus nos Tribunais',
      'Defesa em Ações Penais, Tribunal do Júri e Recursos Criminais',
      'Defesa em Crimes Ambientais, Tributários e do Agronegócio',
      'Assistência de Acusação e Acompanhamento de Vítimas em Inquéritos'
    ],
    exemploCaso: {
      titulo: 'Atuação em Audiência de Custódia e Trancamento de Inquérito Ambiental',
      resumo:
        'Intervenção técnica imediata demonstrando ausência de requisitos para prisão cautelar e atipicidade de conduta em autuação ambiental.',
      resultado: 'Liberdade preservada desde o primeiro ato e arquivamento da persecução.'
    },
    metricaDestaque: 'Plantão 24h para urgências criminais e audiências de custódia',
    linkWhats: criarLinkWhatsArea('Direito Criminal (Atendimento Prioritário)'),
    icon: Scale
  }
];
