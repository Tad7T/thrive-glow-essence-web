import React from 'react';
import { Clock, Droplets, Bath, Calendar, AlertTriangle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Step = ({ icon, title, description, delay }: StepProps) => {
  return (
    <RevealOnScroll delay={delay}>
      <div className="group relative h-full p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-thrive-olive/10 hover:border-thrive-olive/30">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 flex items-center justify-center bg-thrive-olive rounded-full border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="pt-8 text-center">
          <h3 className="font-bold text-xl mb-3 text-thrive-brown group-hover:text-thrive-olive transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

const HowToUseSection = () => {
  const steps = [
    {
      icon: <Droplets className="text-white" size={24} />,
      title: "Apply",
      description: "Apply a small amount into the scalp."
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: "Massage & Comb",
      description: "Massage oil in with fingers and comb through to the end of hair."
    },
    {
      icon: <Calendar className="text-white" size={24} />,
      title: "Leave In",
      description: "Leave it on for a few hours or overnight."
    },
    {
      icon: <Bath className="text-white" size={24} />,
      title: "Rinse & Shampoo",
      description: "Rinse and proceed with shampooing."
    }
  ];

  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-gradient-to-b from-white to-thrive-yellow-light/30">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-thrive-olive/10 text-thrive-olive rounded-full text-sm font-medium mb-4">
              Application Guide
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-thrive-brown mb-4">
              Simple 4-Step Routine
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Achieve optimal results with our easy-to-follow application process
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={200 + index * 100}
            />
          ))}
        </div>
        
        <RevealOnScroll delay={600}>
          <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-thrive-olive/20 flex items-start space-x-4 max-w-2xl mx-auto">
            <div className="flex-shrink-0 w-10 h-10 bg-thrive-brown/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-thrive-brown" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-thrive-brown mb-1">Important Safety Note</h4>
              <p className="text-gray-600">
                Perform a sensitivity test first: Place a small sample on your skin and observe for 24 hours to ensure there is no irritation or discomfort.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default HowToUseSection;