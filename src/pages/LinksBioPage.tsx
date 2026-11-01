import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  MessageCircle,
  Star,
  MapPin,
  ArrowRight,
  Sprout,
  HeartHandshake,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { servicos } from '../data/servicos';

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

export const LinksBioPage: React.FC = () => {
  const whatsGeral =
    'https://wa.me/5562999999999?text=Ol%C3%A1!%20Vim%20pelo%20link%20da%20bio%20do%20Instagram%20e%20gostaria%20de%20atendimento%20jur%C3%ADdico.';

  return (
    <>
      <Helmet>
        <title>Links Rápidos & Atendimento | Escritório de Advocacia</title>
        <meta
          name="description"
          content="Canais diretos de atendimento jurídico no WhatsApp, áreas de atuação (Direito Agrário, Vara de Família, Previdenciário e Criminal), localização e conteúdos."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0B1911] text-[#F3F1EC] py-12 px-4 relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C5A059]/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-lg mx-auto relative z-10">
          {/* Topo da Bio */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-[#13261B] border-2 border-[#C5A059] flex items-center justify-center mx-auto mb-4 shadow-xl animate-float-slow">
              <Scale size={38} className="text-[#C5A059]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#C5A059] font-bold">
              Advocacia Especializada • GO & Brasil
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
              Escritório de Advocacia
            </h1>
            <p className="text-stone-300 text-sm mt-2 max-w-md mx-auto">
              Direito Agrário • Vara de Família • Previdenciário (INSS) • Criminal. Escolha abaixo como deseja ser atendido:
            </p>
          </div>

          {/* CTA Principal: WhatsApp Direto */}
          <a
            href={whatsGeral}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold p-4 rounded-xl shadow-lg mb-4 transition-all transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={22} />
              <span>Atendimento Imediato no WhatsApp</span>
            </span>
            <ArrowRight size={20} />
          </a>

          {/* Botões por Especialidade (Direito Agrário, Família, Previdenciário, Criminal) */}
          <div className="space-y-3 mb-6">
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold px-1">
              Falar com Especialista por Área:
            </p>
            {servicos.map((s) => {
              const Icon =
                s.id === 'agrario'
                  ? Sprout
                  : s.id === 'familia'
                  ? HeartHandshake
                  : s.id === 'previdenciario'
                  ? ShieldCheck
                  : Scale;
              return (
                <a
                  key={s.id}
                  href={s.linkWhats}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 w-full bg-[#13261B] hover:bg-[#193324] border border-[#C5A059]/30 hover:border-[#C5A059] p-3.5 rounded-xl transition-all group"
                >
                  <img
                    src={s.imagem}
                    alt={s.imagemAlt}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#C5A059]/40"
                  />
                  <div className="flex-1 text-left">
                    <h2 className="text-sm font-bold text-white group-hover:text-[#E5C77D] flex items-center gap-1.5">
                      <Icon size={15} className="text-[#C5A059]" />
                      {s.titulo}
                    </h2>
                    <p className="text-xs text-stone-400 line-clamp-1">{s.subtitulo}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-[#C5A059] group-hover:translate-x-1 transition-transform shrink-0"
                  />
                </a>
              );
            })}
          </div>

          {/* Links para o Site Completo, Google Meu Negócio e Instagram */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center justify-between w-full bg-[#13261B] hover:bg-[#193324] border border-white/15 p-4 rounded-xl text-sm font-semibold text-white transition-all"
            >
              <span className="flex items-center gap-3">
                <Globe size={18} className="text-[#C5A059]" />
                Acessar Site Completo & Casos Práticos
              </span>
              <ArrowRight size={16} className="text-[#C5A059]" />
            </Link>

            <a
              href="https://www.google.com/maps/search/Escrit%C3%B3rio+de+Advocacia+Goi%C3%A1s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#13261B] hover:bg-[#193324] border border-white/15 p-4 rounded-xl text-sm font-semibold text-white transition-all"
            >
              <span className="flex items-center gap-3">
                <Star size={18} className="text-[#C5A059]" />
                Avaliações 5.0 ★ e Localização no Google (GMB)
              </span>
              <MapPin size={16} className="text-[#C5A059]" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#13261B] hover:bg-[#193324] border border-white/15 p-4 rounded-xl text-sm font-semibold text-white transition-all"
            >
              <span className="flex items-center gap-3">
                <Instagram size={18} className="text-[#C5A059]" />
                Acompanhar Carrosséis e Dicas no Instagram
              </span>
              <ArrowRight size={16} className="text-[#C5A059]" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
