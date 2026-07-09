import React from 'react';
import { BookOpen, AlertCircle, Droplets, Sun, Wind } from 'lucide-react';

const InfoSection = () => {
  const diseases = [
    {
      name: 'Anthracnose',
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
      description: 'Sunken, dark lesions on pods, leaves, and stems. Often has a pinkish spore mass in the center.',
      prevention: 'Use disease-free seeds and rotate crops every 2-3 years.'
    },
    {
      name: 'Leaf Crinkle',
      icon: <Wind className="h-6 w-6 text-purple-500" />,
      description: 'Severe crinkling and curling of leaves. Leaves become thickened and brittle.',
      prevention: 'Remove infected plants immediately and control insect vectors like aphids.'
    },
    {
      name: 'Yellow Mosaic Virus',
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      description: 'Distinct yellow mosaic patterns on leaves. Leads to stunting and reduced pod formation.',
      prevention: 'Control whitefly populations using neem oil or appropriate pesticides.'
    },
    {
      name: 'Powdery Mildew',
      icon: <Droplets className="h-6 w-6 text-slate-400" />,
      description: 'White, flour-like coating on leaves. Most common in dry, cool weather.',
      prevention: 'Maintain proper plant spacing and apply sulfur-based sprays if detected early.'
    },
    {
      name: 'Healthy Leaf',
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      description: 'Vibrant green color, smooth texture, and no visible spots or discoloration.',
      prevention: 'Continue regular monitoring and optimal fertilization.'
    }
  ];

  return (
    <section id="info" className="section-container bg-slate-100/50 dark:bg-slate-900/30 rounded-[3rem] my-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Black Gram Diseases</h2>
          <p className="text-slate-800 dark:text-slate-600 max-w-2xl mx-auto">
            Understanding common diseases is the first step toward effective crop management.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {diseases.map((disease, index) => (
            <div key={index} className="glass-morphism rounded-3xl p-8 hover:translate-y-[-10px] transition-transform duration-300">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl w-fit mb-6 shadow-sm">
                {disease.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{disease.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                {disease.description}
              </p>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="text-sm font-bold flex items-center mb-3">
                  <BookOpen className="h-4 w-4 mr-2 text-primary-600" />
                  Prevention Tips
                </h4>
                <p className="text-xs text-slate-500 italic">
                  {disease.prevention}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
