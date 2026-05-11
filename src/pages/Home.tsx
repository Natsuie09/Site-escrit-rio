import React from 'react';
import { Link } from 'react-router-dom';
import { localidades } from '../data/localidades';
import { servicos } from '../data/servicos';
import { Scale, MapPin, Shield, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { TeamGrid } from '../components/TeamGrid';

export const Home: React.FC = () => {
  const title = "Escritório de Advocacia | Excelência e Atendimento Regionalizado";
  const description = "Escritório de advocacia atuando com excelência em Goiás. Confira nossas regiões de atendimento e áreas de prática especializadas.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Navigation */}
        <nav className="bg-slate-950 text-white p-6">
          <div className="max-w-6xl mx-auto flex items-center gap-3 font-bold text-2xl tracking-tight">
            <Scale size={32} className="text-emerald-500" />
            <span>Escritório de Advocacia</span>
          </div>
        </nav>

        {/* HERO */}
        <header className="bg-slate-900 text-white py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-[20%] left-[50%] w-[100%] h-[150%] bg-emerald-500 blur-[150px] rounded-full -translate-x-1/2"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Excelência Jurídica ao seu Alcance
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto mb-10">
              Defendemos seus direitos com estratégia e proximidade. Escolha sua região para um atendimento personalizado.
            </p>
          </div>
        </header>

        {/* CIDADES */}
        <section className="py-20 px-6 max-w-6xl mx-auto -mt-16 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Onde Atuamos</h2>
              <p className="text-slate-600 text-lg">Selecione sua cidade para iniciar o atendimento online ou agendar uma reunião.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Object.values(localidades).map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/advogado-em/${loc.slug}`}
                  className="flex items-center gap-4 p-6 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                >
                  <div className="bg-slate-100 p-3 rounded-full group-hover:bg-emerald-100 transition-colors">
                    <MapPin className="text-slate-500 group-hover:text-emerald-600" size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700">{loc.nome}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{loc.especialidadeDestaque}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ALL SERVICES */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Nossas Áreas de Prática</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Equipe multidisciplinar pronta para atuar nos casos mais complexos.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicos.map((servico) => {
              const Icon = servico.icon;
              return (
                <div key={servico.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <Icon className="text-emerald-500 mb-6" size={40} />
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{servico.titulo}</h3>
                  <p className="text-slate-600 leading-relaxed">{servico.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* NOSSOS ESPECIALISTAS */}
        <div className="bg-slate-50 border-t border-slate-100">
          <TeamGrid />
        </div>

        {/* TRUST SIGNALS */}
        <section className="bg-slate-900 py-20 px-6 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <Shield size={48} className="text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-10">Por que escolher nosso escritório?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4">
                <CheckCircle className="text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Sigilo Absoluto</h4>
                  <p className="text-slate-400 text-sm">Seus dados e informações são tratados com o mais alto nível de segurança.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Atendimento Online</h4>
                  <p className="text-slate-400 text-sm">Acompanhe seu processo e faça reuniões sem precisar sair de casa.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Foco em Resultados</h4>
                  <p className="text-slate-400 text-sm">Estratégias jurídicas modernas para buscar o melhor cenário para você.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-slate-950 text-slate-400 py-10 text-center text-sm">
          <p>© {new Date().getFullYear()} Escritório de Advocacia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
};
