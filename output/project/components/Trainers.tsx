import Image from 'next/image';

interface Trainer {
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

const trainers: Trainer[] = [
  {
    name: 'Ana Cristina',
    specialty: 'Crosfit Coach Nível 2',
    image: '/trainer-ana.webp', // Replace with actual image
    bio: 'Com mais de 10 anos de experiência, Ana é especialista em LPO e ginástica funcional, dedicada a superar seus limites.'
  },
  {
    name: 'Carlos Mendes',
    specialty: 'Especialista em Força e Condicionamento',
    image: '/trainer-carlos.webp', // Replace with actual image
    bio: 'Ex-atleta profissional, Carlos traz uma abordagem única para o desenvolvimento de força e resiliência mental.'
  },
  {
    name: 'Beatriz Lima',
    specialty: 'Mobilidade e Prevenção de Lesões',
    image: '/trainer-beatriz.webp', // Replace with actual image
    bio: 'Focada em garantir que cada movimento seja executado com perfeição, Beatriz é sua guia para uma prática segura e eficaz.'
  },
  {
    name: 'Ricardo Souza',
    specialty: 'Coach de Endurance',
    image: '/trainer-ricardo.webp', // Replace with actual image
    bio: 'Ricardo é apaixonado por ajudar atletas a construírem resistência e a conquistarem novas marcas em desafios de endurance.'
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-20 bg-gray-900 text-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-oswald font-bold text-white mb-4 sm:text-5xl">
          Nossos <span className="text-primary-500">Treinadores</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Conheça os especialistas que vão te guiar em cada etapa da sua transformação.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-primary-950 p-6 rounded-lg shadow-xl hover:shadow-primary-700/30 transition-shadow duration-300 transform hover:scale-[1.02]"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-500">
                <Image
                  src={trainer.image}
                  alt={`Foto de ${trainer.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-2xl font-oswald font-bold text-white mb-2">{trainer.name}</h3>
              <p className="text-primary-400 font-semibold mb-4">{trainer.specialty}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
