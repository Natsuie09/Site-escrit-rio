import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { localidades, type Localidade } from '../data/localidades';
import { servicos } from '../data/servicos';
import { MessageCircle, MapPin, ChevronRight, Scale } from 'lucide-react';

export const RegionalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !localidades[slug]) {
    return <Navigate to="/" replace />; 
  }

  const localidade: Localidade = localidades[slug];

  const title = `Advogado Especialista em ${localidade.nome} | Escritório de Advocacia`;
  const description = localidade.textoChamada;
  const ogImageUrl = "https://seusite.com.br/assets/banner-compartilhamento.jpg"; 

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        
        {/* Navigation / Header simple */}
        <nav className="bg-slate-950 text-white p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-emerald-400 transition-colors">
              <Scale size={24} className="text-emerald-500" />
              <span>Escritório de Advocacia</span>
            </Link>
            <div className="text-sm font-medium text-slate-400 flex items-center gap-1">
              <MapPin size={16} /> Atendimento em {localidade.nome}
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <header className="bg-slate-900 text-white py-24 px-6 text-center shadow-lg relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[200%] bg-emerald-500 blur-[120px] rounded-full rotate-12"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-400 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Consultoria Jurídica Ativa na Região
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Advogado Especialista em <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                {localidade.nome}
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto">
              {localidade.especialidadeDestaque} e Consultoria Online
            </p>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="py-16 px-6 flex-grow -mt-8 relative z-20">
          <article className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
            
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 border-b border-slate-100 pb-6 flex items-center gap-3">
              <Scale className="text-emerald-600" size={32} />
              Atendimento Jurídico Especializado
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Nossa Atuação na Região
                </h3>
                <p className="text-lg leading-relaxed text-slate-600 mb-6">
                  {localidade.textoChamada}
                </p>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h4 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
                    <ChevronRight size={20} className="text-emerald-500" />
                    Foco Principal: {localidade.especialidadeDestaque}
                  </h4>
                  <p className="text-md leading-relaxed text-slate-600">
                    Temos profunda compreensão das demandas judiciais específicas envolvendo <strong>{localidade.especialidadeDestaque.toLowerCase()}</strong> nesta localidade, garantindo a proteção dos seus direitos com excelência.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Consultoria Online e Sigilosa
                </h3>
                <p className="text-lg leading-relaxed text-slate-600 mb-6">
                  Você não precisa se deslocar para ter uma defesa de alto nível. Realizamos todo o acompanhamento processual e reuniões de forma online, com segurança avançada nos seus dados e total confidencialidade.
                </p>
                <a 
                  href={localidade.linkWhatsPersonalizado}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  <MessageCircle size={20} />
                  Falar com um especialista agora
                </a>
              </div>
            </div>

            {/* SERVICES SECTION */}
            <div className="mt-20 pt-16 border-t border-slate-100">
              <h2 className="text-3xl font-bold mb-4 text-center text-slate-800">
                Áreas de Prática Adicionais
              </h2>
              <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 text-lg">
                Além do nosso foco principal, contamos com profissionais qualificados para atender as mais diversas áreas do direito em {localidade.nome}.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicos.map((servico) => {
                  const Icon = servico.icon;
                  return (
                    <div key={servico.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
                      <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                        <Icon className="text-emerald-600 group-hover:text-white transition-colors" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-2">{servico.titulo}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{servico.descricao}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HOW IT WORKS SECTION */}
            <div className="mt-20 pt-16 border-t border-slate-100 text-center">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">
                Como Iniciar Seu Atendimento
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto mb-8">
                O primeiro passo para resolver sua questão é realizar uma análise prévia do seu caso. Clique no botão abaixo para falar diretamente com nossa equipe responsável por {localidade.nome}.
              </p>
              <a
                href={localidade.linkWhatsPersonalizado}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 px-10 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
              >
                <MessageCircle size={24} />
                Solicitar Análise Gratuita
              </a>
            </div>

          </article>
        </main>

        <footer className="bg-slate-950 text-slate-400 py-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Escritório de Advocacia. Todos os direitos reservados.</p>
          <p className="mt-2">Atendimento online para {localidade.nome} e todo o estado de Goiás.</p>
        </footer>

        {/* FLOATING CTA: WhatsApp */}
        <a
          href={localidade.linkWhatsPersonalizado}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full shadow-[0_10px_40px_-10px_rgba(16,185,129,0.8)] transition-all transform hover:-translate-y-1 hover:scale-105 z-50 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label={`Falar no WhatsApp para atendimento jurídico em ${localidade.nome}`}
        >
          <MessageCircle size={24} />
          <span className="hidden sm:inline">Atendimento Rápido</span>
        </a>
      </div>
    </>
  );
};
