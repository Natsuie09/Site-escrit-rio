export interface Localidade {
  nome: string;
  slug: string;
  especialidadeDestaque: string;
  textoChamada: string;
  linkWhatsPersonalizado: string;
}

const gerarLinkWhats = (cidade: string): string => {
  const numeroWhats = "5562999999999"; 
  const mensagem = `Olá, busco atendimento jurídico para a região de ${cidade}`;
  return `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
};

export const localidades: Record<string, Localidade> = {
  "alto-paraiso": {
    nome: "Alto Paraíso",
    slug: "alto-paraiso",
    especialidadeDestaque: "Direito Ambiental e Imobiliário",
    textoChamada: "Atendimento jurídico especializado e estratégico para as demandas da região da Chapada dos Veadeiros.",
    linkWhatsPersonalizado: gerarLinkWhats("Alto Paraíso")
  },
  "faz-tudo": {
    nome: "Faz-Tudo",
    slug: "faz-tudo",
    especialidadeDestaque: "Direito Agrário e Trabalhista Rural",
    textoChamada: "Consultoria jurídica focada no produtor e no trabalhador rural local, com amplo conhecimento da realidade do campo.",
    linkWhatsPersonalizado: gerarLinkWhats("Faz-Tudo")
  },
  "niquelandia": {
    nome: "Niquelândia",
    slug: "niquelandia",
    especialidadeDestaque: "Direito Minerário e Civil",
    textoChamada: "Defesa implacável dos seus direitos com profunda expertise na realidade socioeconômica do norte goiano.",
    linkWhatsPersonalizado: gerarLinkWhats("Niquelândia")
  },
  "uruacu": {
    nome: "Uruaçu",
    slug: "uruacu",
    especialidadeDestaque: "Direito Previdenciário e Familiar",
    textoChamada: "Orientação jurídica próxima, humana e de extrema confiança para as famílias uruaçuenses.",
    linkWhatsPersonalizado: gerarLinkWhats("Uruaçu")
  },
  "campinorte": {
    nome: "Campinorte",
    slug: "campinorte",
    especialidadeDestaque: "Direito Civil e Defesa do Consumidor",
    textoChamada: "Apoio legal completo e dedicado para garantir seus plenos direitos em Campinorte e região.",
    linkWhatsPersonalizado: gerarLinkWhats("Campinorte")
  }
};
