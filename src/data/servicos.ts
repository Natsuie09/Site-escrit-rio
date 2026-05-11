import { Briefcase, Scale, HeartHandshake, ShieldAlert } from 'lucide-react';

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icon: any; // Em produção seria um tipo específico do Lucide
}

export const servicos: Servico[] = [
  {
    id: 'inss',
    titulo: 'Direito Previdenciário (INSS)',
    descricao: 'Aposentadorias, BPC/LOAS, pensão por morte, auxílio-doença e revisão de benefícios com foco na melhor vantagem.',
    icon: Briefcase
  },
  {
    id: 'criminal',
    titulo: 'Direito Criminal',
    descricao: 'Defesa técnica especializada em inquéritos policiais, flagrantes, audiências de custódia e processos penais.',
    icon: ShieldAlert
  },
  {
    id: 'familia',
    titulo: 'Divórcio e Pensão',
    descricao: 'Atuação sensível e ágil em divórcios judiciais e extrajudiciais, fixação, revisão ou execução de pensão alimentícia.',
    icon: HeartHandshake
  },
  {
    id: 'civil',
    titulo: 'Direito Civil',
    descricao: 'Contratos, indenizações, regularização de imóveis e defesa do consumidor com estratégia focada no resultado.',
    icon: Scale
  }
];
