import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Nunca imaginei que poderia alcançar tamanha força e condicionamento. A comunidade é incrível e os coaches são super atenciosos!',
    author: 'Mariana Silva',
    role: 'Membro há 1 ano',
    rating: 5,
    image: '/member-mariana.webp', // Replace with actual image
  },
  {
    quote: 'Minha vida mudou completamente depois que entrei na Crosfit Academy. Mais energia, mais foco e menos estresse.',
    author: 'João Pereira',
    role: 'Membro há 6 meses',
    rating: 5,
    image: '/member-joao.webp', // Replace with actual image
  },
  {
    quote: 'Adoro a intensidade dos treinos e o acompanhamento personalizado. É um investimento na minha saúde que realmente vale a pena.',
    author: 'Paula Fernandes',
    role: 'Membro há 2 anos',
    rating: 4,
    image: '/member-paula.webp', // Replace with actual image
  },
  {
    quote: 'O ambiente é muito acolhedor e desafiador ao mesmo tempo. Cada aula é uma superação e uma dose extra de motivação.',
    author: 'Rafael Almeida',
    role: 'Membro há 8 meses',
    rating: 5,
    image: '/member-rafael.webp', // Replace with actual image
  },
  {
    quote: 'A melhor academia de Crosfit que já frequentei! Treinadores experientes e uma estrutura fantástica.',
    author: 'Carla Oliveira',
    role: 'Membro há 1 ano e meio',
    rating: 5,
    image: '/member-carla.webp', // Replace with actual image
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-950 text-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-oswald font-bold text-white mb-4 sm:text-5xl">
          Histórias de <span className="text-primary-500">Sucesso</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Ouça o que nossos membros têm a dizer sobre a experiência Crosfit Academy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary-900 p-8 rounded-lg shadow-xl flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-primary-500">
                <Image
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.author}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-gray-200 text-lg italic mb-4">"{testimonial.quote}"</p>
              <p className="font-oswald font-semibold text-primary-500 text-xl">{testimonial.author}</p>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
