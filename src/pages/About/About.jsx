const About = () => {
  return (
    <section className="max-w-3xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Sobre o projeto
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-6">
          Sobre o Mini Blog
        </h1>

        <p className="text-gray-600 leading-relaxed mb-4">
          O Mini Blog é uma aplicação web desenvolvida com React e Firebase, que
          permite aos utilizadores criar uma conta, partilhar publicações e
          explorar conteúdos sobre diferentes interesses.
        </p>

        <p className="text-gray-600 leading-relaxed mb-8">
          Este projeto foi criado para colocar em prática conhecimentos de
          desenvolvimento web, autenticação de utilizadores e gestão de
          conteúdos.
        </p>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Tecnologias utilizadas
          </h2>

          <div className="flex flex-wrap gap-2">
            {["React", "JavaScript", "Tailwind CSS", "Firebase"].map(
              (technology) => (
                <span
                  key={technology}
                  className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                >
                  {technology}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
