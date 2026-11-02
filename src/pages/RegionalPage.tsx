import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { localidades, type Localidade } from '../data/localidades';
import { servicos } from '../data/servicos';
import { MessageCircle, MapPin, ChevronRight, Scale, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RegionalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !localidades[slug]) {
    return <Navigate to="/" replace />;
  }

  const localidade: Localidade = localidades[slug];

  const title = `Advogado em ${localidade.nome} | Agrário, Família, Previdenciário e Criminal`;
  const description = localidade.textoChamada;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-transparent text-[#F3F1EC] font-sans relative z-10">
        {/* Header */}
        <nav className="bg-black/65 border-b border-[#C5A059]/25 p-5 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-serif font-bold text-lg text-white hover:text-[#C5A059] transition-colors"
            >
              <Scale size={24} className="text-[#C5A059]" />
              <span>Escritório de Advocacia</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#E5C77D] hidden sm:flex items-center gap-1.5 bg-[#14291D] border border-[#C5A059]/40 px-3 py-1.5 rounded-full">
                <MapPin size={14} className="text-[#C5A059]" /> Comarca / Região: {localidade.nome}
              </span>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-300 hover:text-[#C5A059]"
              >
                <ArrowLeft size={14} /> Voltar ao início
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO REGIONAL */}
        <header className="relative py-24 px-6 text-center overflow-hidden border-b border-[#C5A059]/20">
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src="images/direito-agrario-lavoura.jpg"
              alt={`Atuação jurídica em ${localidade.nome}`}
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1911] via-[#0B1911]/85 to-[#0B1911]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#14291D] border border-[#C5A059]/40 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E5C77D] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              Atendimento Presencial e Online em {localidade.nome}
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Advogado Especialista em{' '}
              <span className="gold-shimmer-text block mt-1">{localidade.nome}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-8">
              {localidade.textoChamada}
            </p>
            <a
              href={localidade.linkWhatsPersonalizado}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle size={20} />
              Falar com Especialista de {localidade.nome}
            </a>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="py-16 px-6 flex-grow">
          <article className="max-w-6xl mx-auto space-y-16">
            <div className="bg-[#13261B] rounded-2xl p-8 md:p-12 border border-[#C5A059]/30 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
                  Destaque Regional
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mb-4">
                  Foco em {localidade.especialidadeDestaque} em {localidade.nome}
                </h2>
                <p className="text-stone-300 leading-relaxed mb-6">
                  Conhecemos de perto a realidade econômica, agrária e familiar de{' '}
                  <strong className="text-white">{localidade.nome}</strong>, oferecendo defesa técnica em Direito Agrário, Vara de Família, Previdenciário (INSS) e Direito Criminal.
                </p>
                <div className="bg-[#0E1E14] p-5 rounded-xl border border-[#C5A059]/30">
                  <h3 className="text-sm font-bold text-[#E5C77D] mb-2 flex items-center gap-2">
                    <ChevronRight size={18} className="text-[#C5A059]" />
                    Atendimento Digital e Sigiloso sem Precisar se Deslocar
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Envie documentos, tire dúvidas e faça reuniões por vídeo direto pelo WhatsApp com total validade jurídica e acompanhamento transparente.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#C5A059]/40 h-80 relative">
                <img
                  src="images/balanca-justica-escritorio.jpg"
                  alt="Escritório de Advocacia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* AS 4 ÁREAS DE ATUAÇÃO NA CIDADE */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-center text-[#C5A059] mb-10">
                Nossas Áreas de Atuação em {localidade.nome}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {servicos.map((servico) => (
                  <div
                    key={servico.id}
                    className="bg-[#13261B] border border-[#C5A059]/25 rounded-2xl overflow-hidden flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={servico.imagem}
                        alt={servico.imagemAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13261B] via-transparent to-transparent" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-2">
                          {servico.titulo}
                        </h3>
                        <p className="text-sm text-stone-300 mb-4">{servico.descricao}</p>
                        <ul className="space-y-1.5 mb-6">
                          {servico.itens.slice(0, 3).map((it, idx) => (
                            <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={localidade.linkWhatsPersonalizado}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#d8b46c] text-[#0B1911] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-all"
                      >
                        <MessageCircle size={16} />
                        Solicitar Atendimento em {localidade.nome}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </main>

        <footer className="bg-[#08120C] text-stone-400 py-8 text-center text-xs border-t border-[#C5A059]/20">
          <p>© {new Date().getFullYear()} Escritório de Advocacia. Atendimento em {localidade.nome} e todo o estado de Goiás.</p>
        </footer>
      </div>
    </>
  );
};
