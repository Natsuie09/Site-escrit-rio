export interface Advogado {
  id: string;
  nome: string;
  cargo: string;
  oab: string;
  bioCurta: string;
  bioCompleta: string;
  especialidades: string[];
  linkWhats: string;
  fotoURL: string;
  cidadesAtuacao: string[];
}

export const advogados: Advogado[] = [
  {
    id: "adv-1",
    nome: "Dr. Carlos Eduardo",
    cargo: "Sócio Fundador • Direito Agrário & Patrimonial",
    oab: "OAB/GO 12.345",
    bioCurta: "Especialista em Direito Agrário, Regularização Fundiária, Crédito Rural e Defesa do Produtor com mais de 15 anos de atuação.",
    bioCompleta: "Dr. Carlos Eduardo lidera o núcleo de Direito Agrário e Agronegócio do escritório. Possui vasta experiência em contratos agrários, renegociação de passivos rurais, ações possessórias e defesas ambientais perante órgãos estaduais e federais, protegendo fazendas e produtores em todo o estado de Goiás.",
    especialidades: ["Direito Agrário", "Crédito Rural & CPR", "Regularização Fundiária", "Ambiental Rural"],
    cidadesAtuacao: ["Alto Paraíso", "Uruaçu", "Faz-Tudo"],
    linkWhats: "https://wa.me/5562999999999?text=Ol%C3%A1%20Dr.%20Carlos%20Eduardo%2C%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20consultoria%20em%20Direito%20Agr%C3%A1rio.",
    fotoURL: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "adv-2",
    nome: "Dra. Mariana Costa",
    cargo: "Sócia Sênior • Vara de Família & Previdenciário",
    oab: "OAB/GO 54.321",
    bioCurta: "Referência em Vara de Família, Sucessões e Direito Previdenciário (INSS Urbano e Rural), unindo rigor técnico e acolhimento humano.",
    bioCompleta: "Dra. Mariana coordena as áreas de Vara de Família e Direito Previdenciário. Com histórico expressivo na concessão de aposentadorias rurais/híbridas, BPC/LOAS, divórcios e inventários de patrimônios rurais e urbanos, oferece atendimento ágil, sigiloso e estratégico.",
    especialidades: ["Vara de Família", "Direito Previdenciário (INSS)", "Inventários & Partilhas", "Aposentadoria Rural"],
    cidadesAtuacao: ["Uruaçu", "Campinorte", "Faz-Tudo"],
    linkWhats: "https://wa.me/5562999999999?text=Ol%C3%A1%20Dra.%20Mariana%2C%20vim%20pelo%20site%20e%20preciso%20de%20atendimento%20em%20Fam%C3%ADlia%2FPrevidenci%C3%A1rio.",
    fotoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "adv-3",
    nome: "Dr. Roberto Alves",
    cargo: "Advogado Especialista • Direito Criminal & Penal",
    oab: "OAB/GO 98.765",
    bioCurta: "Atuação combativa 24h em Direito Criminal, Flagrantes, Audiências de Custódia, Tribunal do Júri e Crimes Ambientais.",
    bioCompleta: "Mestre em Ciências Penais, Dr. Roberto comanda o núcleo Criminal do escritório. Reconhecido pela combatividade e precisão técnica em defesas penais, Habeas Corpus, inquéritos policiais e crimes ligados à atividade rural e ambiental em Niquelândia, Uruaçu e região.",
    especialidades: ["Direito Criminal", "Audiência de Custódia 24h", "Tribunal do Júri", "Crimes Ambientais"],
    cidadesAtuacao: ["Niquelândia", "Uruaçu", "Alto Paraíso"],
    linkWhats: "https://wa.me/5562999999999?text=Ol%C3%A1%20Dr.%20Roberto%2C%20vim%20pelo%20site%20e%20preciso%20de%20atendimento%20na%20%C3%A1rea%20Criminal.",
    fotoURL: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
  }
];
