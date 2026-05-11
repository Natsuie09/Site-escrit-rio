import React, { useState } from 'react';
import { X, MessageCircle, MapPin, Briefcase, Award } from 'lucide-react';
import { advogados, type Advogado } from '../data/advogadosData';

export const TeamGrid: React.FC = () => {
  const [selectedAdvogado, setSelectedAdvogado] = useState<Advogado | null>(null);

  // Fecha o modal ao clicar fora ou na tecla ESC (simples)
  const closeModal = () => setSelectedAdvogado(null);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Nossos Especialistas</h2>
        <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-6 rounded-full"></div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Uma equipe de alto nível dedicada a entregar resultados excepcionais e segurança jurídica em todas as regiões que atuamos.
        </p>
      </div>

      {/* Grid: 1 coluna no mobile, 3 no desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {advogados.map((adv) => (
          <div 
            key={adv.id} 
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col cursor-pointer"
            onClick={() => setSelectedAdvogado(adv)}
          >
            {/* Foto com overlay */}
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply group-hover:bg-slate-900/20 transition-all z-10"></div>
              <img 
                src={adv.fotoURL} 
                alt={adv.nome} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <span className="bg-[#C5A059] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {adv.oab}
                </span>
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">{adv.nome}</h3>
              <p className="text-[#C5A059] font-medium text-sm mb-4">{adv.cargo}</p>
              
              <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                {adv.bioCurta}
              </p>
              
              <div className="space-y-3 pt-6 border-t border-slate-100 mt-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Briefcase size={16} className="text-[#C5A059]" />
                  <span>{adv.especialidades[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-[#C5A059]" />
                  <span>Atuação: {adv.cidadesAtuacao.join(', ')}</span>
                </div>
              </div>
              
              <div className="mt-8 text-center text-sm font-bold text-slate-400 group-hover:text-[#C5A059] transition-colors">
                Ver Perfil Completo &rarr;
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAdvogado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay fundo escuro */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-slate-100 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={24} className="text-slate-800" />
            </button>

            {/* Foto Modal */}
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img 
                src={selectedAdvogado.fotoURL} 
                alt={selectedAdvogado.nome} 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:hidden"></div>
            </div>

            {/* Texto Modal */}
            <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto">
              <div className="mb-2 inline-flex items-center gap-2 text-[#C5A059] font-bold text-sm tracking-widest uppercase">
                <Award size={16} /> {selectedAdvogado.oab}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {selectedAdvogado.nome}
              </h3>
              <p className="text-slate-500 text-lg mb-8">{selectedAdvogado.cargo}</p>

              <div className="prose prose-slate max-w-none mb-10">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {selectedAdvogado.bioCompleta}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Briefcase size={18} className="text-[#C5A059]" /> Especialidades
                  </h4>
                  <ul className="space-y-2">
                    {selectedAdvogado.especialidades.map((esp, i) => (
                      <li key={i} className="text-slate-600 bg-slate-50 px-3 py-1 rounded-md text-sm border border-slate-100 inline-block mr-2 mb-2">
                        {esp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-[#C5A059]" /> Cidades Foco
                  </h4>
                  <ul className="space-y-2">
                    {selectedAdvogado.cidadesAtuacao.map((cid, i) => (
                      <li key={i} className="text-slate-600 bg-slate-50 px-3 py-1 rounded-md text-sm border border-slate-100 inline-block mr-2 mb-2">
                        {cid}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a 
                href={selectedAdvogado.linkWhats}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto gap-3 bg-[#C5A059] hover:bg-[#a38245] text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#C5A059]/30"
              >
                <MessageCircle size={24} />
                Falar com {selectedAdvogado.nome.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
