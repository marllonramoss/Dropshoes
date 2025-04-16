import React from 'react';

type BenefitItemProps = {
  icon: string;
  title: string;
  description: string;
};

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </div>
  );
}

export function BenefitsSection() {
  const benefits = [
    {
      icon: '🚚',
      title: 'Frete Grátis',
      description: 'Para compras acima de R$ 299,90 em todo o Brasil.',
    },
    {
      icon: '⚡',
      title: 'Troca Rápida',
      description: 'Troque ou devolva em até 30 dias sem burocracia.',
    },
    {
      icon: '🔒',
      title: 'Pagamento Seguro',
      description: 'Pague com segurança usando métodos criptografados.',
    },
  ];

  return (
    <section className="bg-zinc-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <BenefitItem key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
