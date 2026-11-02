import React, { useState } from 'react';
import { X, MessageCircle, MapPin, Briefcase, Award, ArrowUpRight } from 'lucide-react';
import { advogados, type Advogado } from '../data/advogadosData';

export const TeamGrid: React.FC = () => {
  const [selectedAdvogado, setSelectedAdvogado] = useState<Advogado | null>(null);

  const closeModal = () => setSelectedAdvogado(null);

  return (
    <section id="equipe" className="py-24 px-6 relative overflow-hidden bg-black/25 backdrop-blur-[2px] border-t border-[#C5A059]/20">
      {/* Glow decorativo */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabeçalho inspirado exatamente na referência ("Equipe" à esquerda + descrição à direita) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#C5A059]/20 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C5A059] font-bold block mb-2">
              Corpo Jurídico Especializado
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C5A059]">
              Equipe
            </h2>
          </div>
          <p className="text-stone-200 text-base md:text-lg max-w-xl leading-relaxed drop-shadow">
            Profissionais com atuação dedicada em <strong className="text-white">Direito Agrário, Vara de Família, Previdenciário e Criminal</strong>, combinando rigor técnico, sigilo e proximidade com cada cliente.
          </p>
        </div>

        {/* Grid de Advogados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advogados.map((adv) => (
            <div
              key={adv.id}
              onClick={() => setSelectedAdvogado(adv)}
              className="group relative bg-[#0B1911]/70 backdrop-blur-md rounded-xl overflow-hidden border border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-500 cursor-pointer flex flex-col shadow-xl hover:-translate-y-2"
            >
              {/* Foto com overlay igual à referência */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={adv.fotoURL}
                  alt={`${adv.nome} - ${adv.cargo}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1911] via-[#0B1911]/35 to-transparent" />

                {/* Selo OAB */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#0B1911]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C77D] text-xs font-bold px-3 py-1.5 rounded-full">
                    {adv.oab}
                  </span>
                </div>

                {/* Informações sobrepostas na base da foto (estilo da referência) */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                  <p className="text-[#C5A059] text-xs font-semibold uppercase tracking-wider mb-1">
                    {adv.cargo}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center justify-between">
                    <span>{adv.nome}</span>
                    <ArrowUpRight
                      size={20}
                      className="text-[#C5A059] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </h3>
                </div>
              </div>

              {/* Resumo e tags */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#0B1911]/65 backdrop-blur-md">
                <p className="text-stone-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {adv.bioCurta}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {adv.especialidades.map((esp) => (
                      <span
                        key={esp}
                        className="text-[11px] bg-[#183123] text-[#E5C77D] border border-[#C5A059]/30 px-2.5 py-1 rounded"
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 text-xs text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#C5A059]" />
                      {adv.cidadesAtuacao.join(' • ')}
                    </span>
                    <span className="text-[#C5A059] font-semibold group-hover:underline">
                      Ver currículo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Currículo Completo + WhatsApp Direto */}
      {selectedAdvogado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-[#112217] border border-[#C5A059]/40 text-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-[#C5A059] text-white hover:text-[#0B1911] p-2 rounded-full transition-colors"
              aria-label="Fechar janela"
            >
              <X size={22} />
            </button>

            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img
                src={selectedAdvogado.fotoURL}
                alt={selectedAdvogado.nome}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112217] via-transparent to-transparent md:hidden" />
            </div>

            <div className="md:w-3/5 p-8 md:p-10 overflow-y-auto">
              <div className="mb-2 inline-flex items-center gap-2 text-[#C5A059] font-bold text-xs tracking-widest uppercase">
                <Award size={16} /> {selectedAdvogado.oab}
              </div>
              <h3 className="font-serif text-3xl font-bold text-white mb-1">
                {selectedAdvogado.nome}
              </h3>
              <p className="text-[#C5A059] text-sm font-medium mb-6">
                {selectedAdvogado.cargo}
              </p>

              <p className="text-stone-300 leading-relaxed text-base mb-8">
                {selectedAdvogado.bioCompleta}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-[#C5A059]" /> Áreas de Atuação
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdvogado.especialidades.map((esp, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#183123] text-[#E5C77D] px-3 py-1 rounded border border-[#C5A059]/30"
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-[#C5A059]" /> Unidades e Regiões
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdvogado.cidadesAtuacao.map((cid, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 text-stone-300 px-3 py-1 rounded border border-white/10"
                      >
                        {cid}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={selectedAdvogado.linkWhats}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#C5A059] hover:bg-[#d6b36a] text-[#0B1911] font-bold text-base py-3.5 px-7 rounded-lg transition-all shadow-lg"
              >
                <MessageCircle size={20} />
                Falar diretamente com {selectedAdvogado.nome.split(' ')[0]} no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
