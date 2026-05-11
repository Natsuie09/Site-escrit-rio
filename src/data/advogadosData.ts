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
    cargo: "Sócio Fundador",
    oab: "OAB/GO 12.345",
    bioCurta: "Especialista em Direito Civil e Empresarial com mais de 15 anos de atuação.",
    bioCompleta: "Dr. Carlos Eduardo possui vasta experiência em litígios complexos e consultoria preventiva. Sua atuação tem sido decisiva para empresas e famílias na região norte de Goiás. Acredita em um atendimento personalizado, sempre buscando soluções ágeis e seguras.",
    especialidades: ["Direito Civil", "Empresarial", "Agrário"],
    cidadesAtuacao: ["Alto Paraíso", "Uruaçu"],
    linkWhats: "https://wa.me/5562999999999?text=Olá%20Dr.%20Carlos%20Eduardo,%20gostaria%20de%20uma%20consultoria.",
    fotoURL: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "adv-2",
    nome: "Dra. Mariana Costa",
    cargo: "Advogada Sênior",
    oab: "OAB/GO 54.321",
    bioCurta: "Foco na defesa de direitos previdenciários e questões familiares com empatia e rigor técnico.",
    bioCompleta: "Dra. Mariana tem um histórico de sucesso em ações contra o INSS e mediação de conflitos familiares difíceis. Compreende profundamente as necessidades locais de Faz-Tudo e Campinorte, trazendo tranquilidade e segurança para quem a procura nos momentos de maior fragilidade.",
    especialidades: ["INSS", "Família", "Sucessões"],
    cidadesAtuacao: ["Faz-Tudo", "Campinorte"],
    linkWhats: "https://wa.me/5562999999999?text=Olá%20Dra.%20Mariana,%20preciso%20de%20ajuda%20com%20meu%20caso.",
    fotoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "adv-3",
    nome: "Dr. Roberto Alves",
    cargo: "Advogado Especialista",
    oab: "OAB/GO 98.765",
    bioCurta: "Atuação destacada na área Criminal, garantindo a defesa intransigente de direitos.",
    bioCompleta: "Mestre em Direito Penal, Dr. Roberto lidera o núcleo criminal do escritório. Reconhecido pela firmeza e excelência técnica nos tribunais de Niquelândia e região. Seu compromisso é com a justiça e a defesa incansável dos direitos e garantias fundamentais de seus clientes.",
    especialidades: ["Criminal", "Tribunal do Júri"],
    cidadesAtuacao: ["Niquelândia", "Uruaçu"],
    linkWhats: "https://wa.me/5562999999999?text=Olá%20Dr.%20Roberto,%20tenho%20uma%20urgência.",
    fotoURL: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
  }
];
