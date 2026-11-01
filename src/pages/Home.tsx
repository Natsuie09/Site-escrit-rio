import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  MapPin,
  Shield,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sprout,
  HeartHandshake,
  ShieldCheck,
  Award,
  Building2,
  BookOpen,
  Star,
  Sparkles,
  Send
} from 'lucide-react';
import { localidades } from '../data/localidades';
import { servicos } from '../data/servicos';
import { TeamGrid } from '../components/TeamGrid';

const Instagram: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Home: React.FC = () => {
  const [activeAreaIndex, setActiveAreaIndex] = useState<number>(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);

  // Estado do formulário "Envie uma mensagem" (dispara direto pro WhatsApp com contexto completo)
  const [formNome, setFormNome] = useState('');
  const [formCidade, setFormCidade] = useState('');
  const [formArea, setFormArea] = useState('Direito Agrário e Agronegócio');
  const [formMensagem, setFormMensagem] = useState('');

  // Rotação suave do destaque do Hero a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % servicos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeArea = servicos[activeAreaIndex];
  const heroArea = servicos[heroSlideIndex];

  const handleEnviarWhatsForm = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Olá! Meu nome é *${formNome || 'Cliente'}* (${formCidade || 'Goiás'}).\nPreciso de atendimento em: *${formArea}*.\nResumo do caso: ${formMensagem || 'Gostaria de agendar uma consulta.'}`;
    window.open(
      `https://wa.me/5562999999999?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const title =
    'Escritório de Advocacia | Direito Agrário, Vara de Família, Previdenciário e Criminal';
  const description =
    'Escritório de Advocacia especializado em Direito Agrário e Agronegócio, Vara de Família e Sucessões, Direito Previdenciário (INSS) e Direito Criminal em Goiás. Atendimento presencial e online.';

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Escritório de Advocacia Especializada',
    description,
    areaServed: ['Alto Paraíso de Goiás', 'Uruaçu', 'Niquelândia', 'Campinorte', 'Faz-Tudo', 'Goiás'],
    telephone: '+55-62-99999-9999',
    priceRange: '$$',
    knowsAbout: [
      'Direito Agrário e Agronegócio',
      'Vara de Família e Sucessões',
      'Direito Previdenciário e INSS',
      'Direito Criminal e Defesa Penal'
    ],
    sameAs: ['https://instagram.com']
  };

  const parceiros = [
    {
      nome: 'Produtores Rurais & Fazendas do Norte Goiano',
      categoria: 'Agronegócio & Propriedades Rurais',
      descricao: 'Assessoria jurídica permanente em safras, contratos agrários e proteção fundiária.'
    },
    {
      nome: 'Associações e Cooperativas Agropecuárias',
      categoria: 'Parceria Institucional',
      descricao: 'Defesa coletiva e consultoria preventiva para associados e cooperados.'
    },
    {
      nome: 'Escritórios de Contabilidade Rural & Perícia Técnica',
      categoria: 'Aliança Estratégica',
      descricao: 'Atuação conjunta em planejamento sucessório, holdings rurais e cálculos do INSS.'
    },
    {
      nome: 'Sindicatos e Entidades de Apoio ao Trabalhador e Família',
      categoria: 'Atuação Regional',
      descricao: 'Orientação previdenciária, trabalhista rural e proteção familiar nas comarcas de Goiás.'
    }
  ];

  const artigosExemplos = [
    {
      categoria: 'Direito Agrário',
      titulo: 'Como proteger a propriedade rural em contratos de arrendamento e renegociação de crédito',
      resumo:
        'Veja os cuidados indispensáveis antes de assinar contratos agrários ou cédulas de produto rural (CPR) e como evitar riscos ao patrimônio da fazenda.',
      imagem: 'images/direito-agrario-lavoura.jpg',
      alt: 'Colheitadeiras em lavoura de soja e milho - Direito Agrário',
      linkWhats: servicos[0].linkWhats
    },
    {
      categoria: 'Direito Previdenciário (INSS)',
      titulo: 'Aposentadoria Híbrida e Rural: como somar tempo do campo e da cidade para conquistar o melhor benefício',
      resumo:
        'Muitos segurados têm direito a valores maiores no INSS utilizando períodos trabalhados na roça ou em regime de economia familiar.',
      imagem: 'images/previdenciario-aposentadoria-familia.jpg',
      alt: 'Casal idoso com moedas crescentes e proteção previdenciária',
      linkWhats: servicos[2].linkWhats
    },
    {
      categoria: 'Vara de Família & Sucessões',
      titulo: 'Inventário de bens rurais e urbanos, divórcio e guarda: como resolver com agilidade e proteção patrimonial',
      resumo:
        'Entenda quando é possível realizar o inventário ou divórcio diretamente em cartório e como blindar o patrimônio da família.',
      imagem: 'images/previdenciario-protecao.jpg',
      alt: 'Proteção familiar e patrimonial com guarda-chuva azul',
      linkWhats: servicos[1].linkWhats
    },
    {
      categoria: 'Direito Criminal',
      titulo: 'Atuação em flagrantes, audiências de custódia e defesa em crimes ambientais e rurais',
      resumo:
        'Por que a presença imediata do advogado criminalista nas primeiras horas define o rumo do inquérito e preserva a liberdade.',
      imagem: 'images/balanca-justica-escritorio.jpg',
      alt: 'Balança da justiça dourada em biblioteca jurídica clássica',
      linkWhats: servicos[3].linkWhats
    }
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify(schemaJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0B1911] text-[#F3F1EC] font-sans selection:bg-[#C5A059] selection:text-[#0B1911]">
        {/* ================= NAVBAR SUPERIOR ================= */}
        <nav className="sticky top-0 z-40 bg-[#0B1911]/95 backdrop-blur-md border-b border-[#C5A059]/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#14291D] border border-[#C5A059]/50 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                <Scale
                  size={22}
                  className="text-[#C5A059] group-hover:text-[#0B1911] transition-colors"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg md:text-xl tracking-wide text-white block leading-none">
                  ESCRITÓRIO DE ADVOCACIA
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059] block mt-1">
                  Agrário • Família • Previdenciário • Criminal
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.16em] text-stone-300 font-medium">
              <a href="#atuacao" className="hover:text-[#C5A059] transition-colors">
                Áreas de Atuação
              </a>
              <a href="#vitrine-animada" className="hover:text-[#C5A059] transition-colors">
                Destaques Visuais
              </a>
              <a href="#quem-somos" className="hover:text-[#C5A059] transition-colors">
                Quem Somos
              </a>
              <a href="#parceiros" className="hover:text-[#C5A059] transition-colors">
                Parceiros
              </a>
              <a href="#equipe" className="hover:text-[#C5A059] transition-colors">
                Equipe
              </a>
              <a href="#artigos" className="hover:text-[#C5A059] transition-colors">
                Casos & Artigos
              </a>
              <Link to="/links" className="text-[#E5C77D] hover:underline flex items-center gap-1">
                <Instagram size={14} /> Bio / Links
              </Link>
            </div>

            <a
              href="https://wa.me/5562999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Escrit%C3%B3rio%20e%20gostaria%20de%20atendimento%20jur%C3%ADdico."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all shadow-lg hover:scale-105"
            >
              <MessageCircle size={16} />
              <span>Fale Conosco</span>
            </a>
          </div>
        </nav>

        {/* ================= HERO SECTION (INSPIRADO NA REFERÊNCIA) ================= */}
        <header className="relative min-h-[84vh] flex items-center bg-[#0B1911] overflow-hidden border-b border-[#C5A059]/20">
          {/* Imagem de fundo suave com marca d'água jurídica */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="images/balanca-justica-escritorio.jpg"
              alt="Biblioteca jurídica e balança da justiça"
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1911] via-[#0B1911]/90 to-[#0B1911]/50" />
          </div>

          {/* Barra lateral esquerda vertical (igual à referência raspada) */}
          <div className="hidden xl:flex flex-col items-center justify-between py-12 px-4 border-r border-[#C5A059]/15 h-full z-20 text-stone-400">
            <div className="w-px h-16 bg-[#C5A059]/30" />
            <div className="flex flex-col gap-6 my-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A059] transition-colors"
                title="Instagram do Escritório"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5562999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A059] transition-colors"
                title="WhatsApp Direto"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#contato"
                className="hover:text-[#C5A059] transition-colors"
                title="Localização e Contato"
              >
                <MapPin size={18} />
              </a>
            </div>
            <div className="w-px h-16 bg-[#C5A059]/30" />
          </div>

          {/* Conteúdo Principal do Hero */}
          <div className="max-w-7xl mx-auto w-full px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Coluna Esquerda: Título Editorial + Botões + Seletores das 4 Áreas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#14291D] border border-[#C5A059]/40 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#E5C77D]">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
                Atuação Jurídica Estratégica em Goiás e em Todo o Brasil
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white">
                Somos especialistas em{' '}
                <span className="gold-shimmer-text block mt-1">{heroArea.titulo}</span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
                {heroArea.descricao}
              </p>

              {/* CTAs do Hero */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={heroArea.linkWhats}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  Falar com Especialista Agora
                </a>
                <a
                  href="#atuacao"
                  className="inline-flex items-center gap-2 border border-[#C5A059]/50 hover:border-[#C5A059] text-[#E5C77D] font-semibold text-sm px-6 py-4 rounded-full transition-all hover:bg-[#14291D]"
                >
                  Saiba mais
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Pílulas de troca rápida das 4 áreas no Hero */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 block mb-3">
                  Nossos 4 Núcleos de Excelência (clique para alternar):
                </span>
                <div className="flex flex-wrap gap-2">
                  {servicos.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setHeroSlideIndex(idx)}
                      className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                        heroSlideIndex === idx
                          ? 'bg-[#C5A059] text-[#0B1911] border-[#C5A059] shadow-md'
                          : 'bg-[#13261B]/80 text-stone-300 border-[#C5A059]/25 hover:border-[#C5A059]/60'
                      }`}
                    >
                      {s.titulo}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna Direita: Moldura com Listras Diagonais Douradas (igual à imagem de referência!) */}
            <div className="lg:col-span-6 relative">
              {/* Faixa diagonal listrada dourada atrás da imagem */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gold-stripes rounded-2xl -rotate-2 pointer-events-none border border-[#C5A059]/20" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-[#13261B] aspect-[16/11]">
                <img
                  key={heroArea.imagem}
                  src={heroArea.imagem}
                  alt={heroArea.imagemAlt}
                  className="w-full h-full object-cover animate-ken-burns transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-transparent to-black/20" />

                {/* Card flutuante animado sobre a imagem */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#0B1911]/90 backdrop-blur-md border border-[#C5A059]/40 p-5 rounded-xl flex items-center justify-between gap-4 animate-float-slow">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block">
                      Destaque da Área
                    </span>
                    <p className="text-white font-serif font-bold text-base sm:text-lg">
                      {heroArea.metricaDestaque}
                    </p>
                  </div>
                  <a
                    href={heroArea.linkWhats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-11 h-11 rounded-full bg-[#C5A059] text-[#0B1911] flex items-center justify-center hover:scale-110 transition-transform"
                    title="Consultar no WhatsApp"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================= SEÇÃO 2: ÁREAS DE ATUAÇÃO (LAYOUT SPLIT DA REFERÊNCIA) ================= */}
        <section id="atuacao" className="py-24 px-6 bg-[#0D1E14] relative">
          <div className="max-w-7xl mx-auto">
            {/* Título inspirado na referência */}
            <div className="max-w-3xl mb-14">
              <div className="w-12 h-0.5 bg-[#C5A059] mb-4" />
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#C5A059] leading-tight mb-4">
                Áreas de Atuação
              </h2>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                Atuamos de ponta a ponta nas demandas que exigem maior rigor técnico e proximidade: da proteção da lavoura e do produtor no <strong className="text-white">Direito Agrário</strong> à segurança da sua família na <strong className="text-white">Vara de Família</strong>, conquista de benefícios no <strong className="text-white">Previdenciário (INSS)</strong> e defesa intransigente no <strong className="text-white">Direito Criminal</strong>.
              </p>
            </div>

            {/* Container Verde Escuro com Coluna de Cards à Esquerda + Painel Detalhado à Direita */}
            <div className="bg-[#13281C] border border-[#C5A059]/25 rounded-2xl p-6 sm:p-10 shadow-2xl grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Coluna Esquerda: Lista vertical de cards com foto de fundo (igual à referência!) */}
              <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
                {servicos.map((servico, idx) => {
                  const isSelected = idx === activeAreaIndex;
                  const Icon = servico.icon;
                  return (
                    <button
                      key={servico.id}
                      onClick={() => setActiveAreaIndex(idx)}
                      className={`group relative overflow-hidden rounded-xl text-left p-5 transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-lg scale-[1.01]'
                          : 'border-white/10 hover:border-[#C5A059]/50 opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Foto de fundo à direita com máscara */}
                      <div className="absolute inset-0">
                        <img
                          src={servico.imagem}
                          alt={servico.imagemAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1911] via-[#0B1911]/90 to-[#0B1911]/40" />
                      </div>

                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-6 h-6 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E5C77D]">
                              <Icon size={13} />
                            </span>
                            <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold">
                              Núcleo 0{idx + 1}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#E5C77D] transition-colors">
                            {servico.titulo}
                          </h3>
                          <p className="text-xs text-stone-300 line-clamp-2 mt-1">
                            {servico.subtitulo}
                          </p>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#0B1911]'
                              : 'bg-white/10 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0B1911]'
                          }`}
                        >
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Coluna Direita: Painel Interativo da Área Selecionada */}
              <div className="lg:col-span-7 bg-[#0E1E14] rounded-xl border border-[#C5A059]/30 overflow-hidden flex flex-col justify-between">
                {/* Imagem de topo com animação e overlay */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    key={activeArea.imagem}
                    src={activeArea.imagem}
                    alt={activeArea.imagemAlt}
                    className="w-full h-full object-cover animate-ken-burns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E14] via-[#0E1E14]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <span className="bg-[#C5A059] text-[#0B1911] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded">
                        Atuação Especializada
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
                        {activeArea.titulo}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Detalhamento dos Serviços + Caso Prático (Tópico Obrigatório 2 e 4) */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                      {activeArea.descricao}
                    </p>

                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-3">
                      Demandas e Serviços Oferecidos:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {activeArea.itens.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-stone-200 bg-[#14291D]/70 p-2.5 rounded-lg border border-white/5"
                        >
                          <CheckCircle2 size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Box de Exemplo Real de Serviço (Tópico Obrigatório 4) */}
                    <div className="bg-[#152C1F] border-l-4 border-[#C5A059] p-4 rounded-r-xl">
                      <span className="text-[11px] uppercase tracking-widest text-[#E5C77D] font-bold block mb-1">
                        Exemplo Prático de Atuação: {activeArea.exemploCaso.titulo}
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed mb-1.5">
                        {activeArea.exemploCaso.resumo}
                      </p>
                      <p className="text-xs font-semibold text-[#C5A059]">
                        ✓ Resultado: {activeArea.exemploCaso.resultado}
                      </p>
                    </div>
                  </div>

                  {/* Barra inferior de ação */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setActiveAreaIndex(
                            (prev) => (prev - 1 + servicos.length) % servicos.length
                          )
                        }
                        className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1911] transition-colors cursor-pointer"
                        aria-label="Área anterior"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-xs text-stone-400 px-2">
                        {activeAreaIndex + 1} / {servicos.length}
                      </span>
                      <button
                        onClick={() =>
                          setActiveAreaIndex((prev) => (prev + 1) % servicos.length)
                        }
                        className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1911] transition-colors cursor-pointer"
                        aria-label="Próxima área"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    <a
                      href={activeArea.linkWhats}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-lg transition-all shadow-lg"
                    >
                      <MessageCircle size={17} />
                      Consultar sobre {activeArea.titulo.split(' ')[0]}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 3: VITRINE VISUAL ANIMADA NO MEIO DO SITE ================= */}
        <section
          id="vitrine-animada"
          className="py-24 px-6 bg-[#0B1911] border-t border-b border-[#C5A059]/20 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-3">
                <Sparkles size={14} /> Pilares de Proteção Jurídica
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
                Defesa Completa para o Campo, a Família, o Aposentado e a Liberdade
              </h2>
              <p className="text-stone-300 text-base">
                Passe o mouse ou toque em cada cenário abaixo para explorar como atuamos de forma prática em cada momento decisivo.
              </p>
            </div>

            {/* 4 Cenários Animados com as Imagens Enviadas pelo Usuário */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card Animado 1: Direito Agrário (Lavoura e Colheitadeiras) */}
              <div className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-2xl">
                <img
                  src="images/direito-agrario-lavoura.jpg"
                  alt="Colheitadeiras na lavoura - Direito Agrário"
                  className="w-full h-full object-cover animate-ken-burns group-hover:scale-110 transition-transform duration-700"
                />
                {/* Brilho solar animado no canto superior direito */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/40 rounded-full blur-2xl animate-lamp-glow pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#0B1911]/55 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#0B1911]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C77D] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-float-slow">
                  <Sprout size={14} className="text-[#C5A059]" />
                  Direito Agrário
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Força no Campo & Segurança na Safra
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    Regularização de terras, contratos de parceria/arrendamento, alongamento de crédito rural e defesa ambiental.
                  </p>
                  <a
                    href={servicos[0].linkWhats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] group-hover:text-[#E5C77D]"
                  >
                    Proteger minha propriedade <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card Animado 2: Vara de Família (Guarda-chuva Azul e Proteção Familiar) */}
              <div className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-2xl">
                <img
                  src="images/previdenciario-protecao.jpg"
                  alt="Proteção familiar e patrimonial com guarda-chuva"
                  className="w-full h-full object-cover animate-ken-burns group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#0B1911]/55 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#0B1911]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C77D] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-float-slow">
                  <HeartHandshake size={14} className="text-[#C5A059]" />
                  Vara de Família
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Proteção Familiar, Inventário & Partilha
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    Divórcios consensuais e litigiosos, pensão alimentícia, guarda e inventários extrajudiciais/judiciais sem desgaste.
                  </p>
                  <a
                    href={servicos[1].linkWhats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] group-hover:text-[#E5C77D]"
                  >
                    Falar com advogado de família <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card Animado 3: Previdenciário / INSS (Moedas Crescentes e Casal Idoso) */}
              <div className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-2xl">
                <img
                  src="images/previdenciario-aposentadoria-familia.jpg"
                  alt="Aposentadoria e evolução patrimonial no INSS"
                  className="w-full h-full object-cover animate-ken-burns group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#0B1911]/55 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#0B1911]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C77D] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-float-slow">
                  <ShieldCheck size={14} className="text-[#C5A059]" />
                  Previdenciário (INSS)
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Aposentadoria Justa Urbana e Rural
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    Concessão e revisão de aposentadorias, BPC/LOAS, auxílio-doença e pensão por morte contra negativas do INSS.
                  </p>
                  <a
                    href={servicos[2].linkWhats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] group-hover:text-[#E5C77D]"
                  >
                    Analisar meu benefício <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card Animado 4: Criminal & Tradição (Balança da Justiça + Luminária Acesa) */}
              <div className="group relative h-[420px] rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-2xl">
                <img
                  src="images/balanca-justica-escritorio.jpg"
                  alt="Balança da justiça e luminária acesa na biblioteca jurídica"
                  className="w-full h-full object-cover animate-ken-burns group-hover:scale-110 transition-transform duration-700"
                />
                {/* Efeito animado de luz quente sobre a luminária da foto */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-300/35 rounded-full blur-2xl animate-lamp-glow pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#0B1911]/55 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#0B1911]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C77D] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-float-slow">
                  <Scale size={14} className="text-[#C5A059] animate-scale-balance" />
                  Direito Criminal 24h
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Defesa Penal Técnica & Plantão 24h
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    Atuação imediata em delegacias, audiências de custódia, Habeas Corpus, Tribunal do Júri e defesas ambientais.
                  </p>
                  <a
                    href={servicos[3].linkWhats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] group-hover:text-[#E5C77D]"
                  >
                    Acionar plantão criminal <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 4: QUEM SOMOS (TÓPICO OBRIGATÓRIO 1 - FIEL À REFERÊNCIA) ================= */}
        <section id="quem-somos" className="py-24 px-6 bg-[#102116] relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
              {/* Texto Quem Somos à esquerda */}
              <div className="lg:col-span-5 space-y-5">
                <div className="w-12 h-0.5 bg-[#C5A059]" />
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#C5A059]">
                  Quem Somos
                </h2>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  Tradição jurídica, visão estratégica e compromisso real com quem produz e trabalha.
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Nosso escritório nasceu com o propósito de oferecer uma advocacia acessível, técnica e implacável na defesa dos direitos dos nossos clientes no estado de Goiás e em todo o território nacional.
                </p>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Unimos profundo conhecimento da realidade do campo (<strong className="text-white">Direito Agrário</strong>) à proteção das famílias (<strong className="text-white">Vara de Família e Sucessões</strong>), à garantia de aposentadorias e benefícios (<strong className="text-white">Direito Previdenciário</strong>) e à defesa intransigente das garantias fundamentais (<strong className="text-white">Direito Criminal</strong>).
                </p>
              </div>

              {/* Monólito / Livro Institucional Central (igual ao meio da seção Quem Somos na referência) */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="w-56 h-72 rounded-xl bg-gradient-to-br from-[#193524] to-[#0B1911] border-2 border-[#C5A059]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 flex flex-col justify-between relative animate-float-slow">
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center">
                    <Scale size={20} className="text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                      Compromisso & Ética
                    </span>
                    <p className="font-serif text-lg font-bold text-white leading-snug">
                      Excelência Jurídica & Atendimento Humanizado
                    </p>
                  </div>
                  <div className="text-[11px] text-[#E5C77D] font-semibold border-t border-[#C5A059]/30 pt-3">
                    OAB/GO • Atuação Regional e Digital
                  </div>
                </div>
              </div>

              {/* Imagem Clássica à Direita */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl h-80 relative">
                  <img
                    src="images/balanca-justica-escritorio.jpg"
                    alt="Estrutura do Escritório de Advocacia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911]/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* 3 Cards Horizontais de Diferenciais (exatamente abaixo de Quem Somos na referência) */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#152B1E] border border-[#C5A059]/25 p-8 rounded-xl hover:border-[#C5A059] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-xl font-bold text-[#C5A059]">
                    Atuação Multidisciplinar Integrada
                  </h4>
                  <Shield className="text-[#C5A059]" size={24} />
                </div>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Quando uma demanda rural esbarra em questões familiares, sucessórias, previdenciárias ou ambientais/criminais, nossa equipe atua de forma unificada no mesmo escritório.
                </p>
              </div>

              <div className="bg-[#152B1E] border border-[#C5A059]/25 p-8 rounded-xl hover:border-[#C5A059] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-xl font-bold text-[#C5A059]">
                    Proximidade e Sigilo Absoluto
                  </h4>
                  <Award className="text-[#C5A059]" size={24} />
                </div>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Atendimento direto com o advogado especialista responsável pelo seu caso, com relatórios claros pelo WhatsApp e reuniões presenciais ou por videochamada.
                </p>
              </div>

              <div className="bg-[#152B1E] border border-[#C5A059]/25 p-8 rounded-xl hover:border-[#C5A059] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-xl font-bold text-[#C5A059]">
                    Foco em Soluções Ágeis
                  </h4>
                  <BookOpen className="text-[#C5A059]" size={24} />
                </div>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Priorizamos medidas extrajudiciais rápidas, liminares estratégicas e acordos vantajosos sempre que possível, reduzindo o tempo de espera do cliente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 5: NOSSOS PARCEIROS & EMPRESAS ATENDIDAS (TÓPICO OBRIGATÓRIO 5) ================= */}
        <section
          id="parceiros"
          className="py-16 px-6 bg-gradient-to-r from-[#1A2E1E] via-[#132418] to-[#1A2E1E] border-t border-b border-[#C5A059]/30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#E5C77D] font-bold block mb-2">
                  Autoridade & Prova Social
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A059] mb-3">
                  Nossos Parceiros & Segmentos Atendidos
                </h2>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Atuamos lado a lado com produtores rurais, empresas locais, contadores, peritos técnicos e entidades regionais para entregar soluções completas.
                </p>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
                {parceiros.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0B1911]/85 border border-[#C5A059]/30 p-5 rounded-xl flex items-start gap-4 hover:border-[#C5A059] transition-all"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
                        {p.categoria}
                      </span>
                      <h3 className="font-bold text-white text-sm sm:text-base mt-0.5 mb-1">
                        {p.nome}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">{p.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 6: EQUIPE (ESPECIALISTAS) ================= */}
        <TeamGrid />

        {/* ================= SEÇÃO 7: ARTIGOS, EXEMPLOS DE SERVIÇOS & CARROSSÉIS (FUNDO CLARO DA REFERÊNCIA!) ================= */}
        <section id="artigos" className="py-24 px-6 bg-[#F3F1EC] text-[#112217]">
          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho igual à seção clara da referência */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="w-12 h-0.5 bg-[#C5A059] mb-3" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8E6F36]">
                  Artigos, Casos Práticos e Conteúdos
                </h2>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#112217] border border-[#112217]/30 px-4 py-2.5 rounded-full hover:bg-[#112217] hover:text-white transition-colors"
              >
                <Instagram size={15} />
                Ver Carrosséis no Instagram
              </a>
            </div>

            {/* Card Principal em Destaque Horizontal (igual à caixa bege/branca no topo da seção clara da referência) */}
            <div className="bg-[#E5DEC9] rounded-2xl p-6 sm:p-10 mb-12 grid md:grid-cols-12 gap-8 items-center shadow-md border border-[#C5A059]/30">
              <div className="md:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <span className="text-[11px] uppercase tracking-widest text-[#8E6F36] font-bold block mb-2">
                  Guia Prático • Direito Agrário & Previdenciário
                </span>
                <h3 className="font-serif text-xl font-bold text-[#112217] mb-3">
                  Diagnóstico Preventivo para Produtores Rurais, Famílias e Segurados do INSS
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Evite perdas patrimoniais e negativas de benefícios com uma análise documental prévia feita por especialistas.
                </p>
                <a
                  href="https://wa.me/5562999999999?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20diagn%C3%B3stico%20jur%C3%ADdico%20do%20meu%20caso."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E6F36] hover:underline"
                >
                  Solicitar análise pelo WhatsApp <ArrowRight size={14} />
                </a>
              </div>

              <div className="md:col-span-7 space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#112217] leading-snug">
                  Entenda como protegemos o seu patrimônio rural, sua família, sua aposentadoria e sua liberdade em cada etapa do processo.
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Confira abaixo exemplos reais de temas e demandas que resolvemos diariamente no escritório e que também compartilhamos em nossos carrosséis educativos no Instagram.
                </p>
              </div>
            </div>

            {/* Grid de 2 Colunas de Artigos e Exemplos Visuais (igual à referência) */}
            <div className="grid md:grid-cols-2 gap-8">
              {artigosExemplos.map((art, i) => (
                <article
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200/80 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={art.imagem}
                      alt={art.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1911]/90 text-[#E5C77D] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                      {art.categoria}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#112217] mb-2 leading-snug">
                        {art.titulo}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed mb-5">
                        {art.resumo}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <a
                        href={art.linkWhats}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8E6F36] hover:text-[#112217] transition-colors"
                      >
                        Tirar dúvida no WhatsApp <ArrowRight size={14} />
                      </a>
                      <Link
                        to="/links"
                        className="text-xs text-stone-400 hover:text-[#8E6F36]"
                      >
                        Ver no Instagram
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 8: CIDADES E UNIDADES DE ATUAÇÃO (SEO LOCAL + GMB) ================= */}
        <section className="py-20 px-6 bg-[#102116] border-t border-[#C5A059]/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-2">
                  Presença Regional & Google Meu Negócio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Comarcas e Cidades de Atuação em Goiás
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-[#162D1F] border border-[#C5A059]/40 px-4 py-2 rounded-full text-xs text-[#E5C77D]">
                <Star size={15} className="fill-[#C5A059] text-[#C5A059]" />
                <span>Atendimento 5.0 ★ avaliado pelos clientes na região</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.values(localidades).map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/advogado-em/${loc.slug}`}
                  className="bg-[#152B1E] hover:bg-[#1B3726] border border-[#C5A059]/25 hover:border-[#C5A059] p-5 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-3 group-hover:bg-[#C5A059] group-hover:text-[#0B1911] transition-colors">
                      <MapPin size={18} />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#E5C77D]">
                      {loc.nome}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                      {loc.especialidadeDestaque}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C5A059] mt-4">
                    Acessar página local <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 9: FALE CONOSCO (RODAPÉ + CARD BRANCO DA REFERÊNCIA!) ================= */}
        <footer
          id="contato"
          className="bg-[#0A160F] pt-20 pb-12 px-6 border-t border-[#C5A059]/30 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
            {/* Coluna Esquerda: Dados de Contato, NAP do GMB e Redes Sociais */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="w-10 h-0.5 bg-[#C5A059] mb-3" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A059]">
                  Fale Conosco
                </h2>
                <p className="text-stone-300 text-sm mt-2 leading-relaxed">
                  Entre em contato para agendar uma consulta presencial ou online com nossos especialistas em Direito Agrário, Família, Previdenciário e Criminal.
                </p>
              </div>

              <div className="space-y-4 text-sm text-stone-300">
                <a
                  href="https://wa.me/5562999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#C5A059] transition-colors"
                >
                  <Phone size={18} className="text-[#C5A059]" />
                  <span>(62) 99999-9999 • WhatsApp & Plantão</span>
                </a>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#C5A059]" />
                  <span>contato@escritoriodeadvocacia.adv.br</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <span>
                    Atendimento em Alto Paraíso, Uruaçu, Niquelândia, Campinorte, Faz-Tudo e Consultoria Digital em todo o Brasil.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#C5A059]" />
                  <span>Seg a Sex: 08h às 18h • Plantão Criminal 24h</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#14291D] hover:bg-[#C5A059] text-white hover:text-[#0B1911] border border-[#C5A059]/40 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <Link
                  to="/links"
                  className="inline-flex items-center gap-2 bg-[#14291D] hover:bg-[#C5A059] text-white hover:text-[#0B1911] border border-[#C5A059]/40 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors"
                >
                  Página de Bio (/links)
                </Link>
              </div>
            </div>

            {/* Coluna Direita: Card Branco Flutuante "Envie uma mensagem" (igual à referência!) */}
            <div className="lg:col-span-7 bg-white text-[#112217] rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#C5A059]/40">
              <h3 className="font-serif text-2xl font-bold text-[#8E6F36] mb-1">
                Envie uma mensagem
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Preencha abaixo para iniciar o atendimento imediato já direcionado à área do seu caso no WhatsApp:
              </p>

              <form onSubmit={handleEnviarWhatsForm} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      value={formNome}
                      onChange={(e) => setFormNome(e.target.value)}
                      placeholder="Nome completo"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-[#8E6F36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Sua Cidade
                    </label>
                    <input
                      type="text"
                      value={formCidade}
                      onChange={(e) => setFormCidade(e.target.value)}
                      placeholder="Ex: Uruaçu / Alto Paraíso"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-[#8E6F36]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Área do Direito
                    </label>
                    <select
                      value={formArea}
                      onChange={(e) => setFormArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:border-[#8E6F36]"
                    >
                      <option value="Direito Agrário e Agronegócio">Direito Agrário</option>
                      <option value="Vara de Família e Sucessões">Vara de Família</option>
                      <option value="Direito Previdenciário (INSS)">Previdenciário (INSS)</option>
                      <option value="Direito Criminal e Defesa Penal">Direito Criminal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Resumo da sua necessidade
                  </label>
                  <textarea
                    rows={3}
                    value={formMensagem}
                    onChange={(e) => setFormMensagem(e.target.value)}
                    placeholder="Conte brevemente como podemos ajudar..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-[#8E6F36]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] text-stone-500">
                    🔒 Atendimento protegido por sigilo profissional da advocacia.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#112217] hover:bg-[#1c3826] text-[#E5C77D] font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-lg transition-all cursor-pointer shadow-md"
                  >
                    <Send size={15} />
                    Enviar para Especialista
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Escritório de Advocacia. Todos os direitos reservados.</p>
            <p>Direito Agrário • Vara de Família • Previdenciário (INSS) • Criminal</p>
          </div>
        </footer>

        {/* ================= BOTÃO FLUTUANTE DO WHATSAPP ================= */}
        <a
          href="https://wa.me/5562999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Escrit%C3%B3rio%20de%20Advocacia%20e%20gostaria%20de%20atendimento."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-extrabold text-sm py-3.5 px-6 rounded-full shadow-[0_10px_35px_rgba(197,160,89,0.5)] transition-all transform hover:-translate-y-1 hover:scale-105"
          aria-label="Falar com advogado no WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="hidden sm:inline">Atendimento no WhatsApp</span>
        </a>
      </div>
    </>
  );
};
