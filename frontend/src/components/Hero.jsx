import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden ">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-200/50 dark:bg-primary-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary-300/30 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Agricultural Intelligence
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Smart Disease Detection for <span className="text-primary-600">Black Gram</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              Revolutionizing agriculture with Deep Learning. Upload your black gram leaf images and get instant, accurate disease predictions with our advanced CNN model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#predict" className="btn-primary flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#info" className="btn-secondary flex items-center justify-center">
                Learn More
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 pt-8">
              <div>
                <h4 className="text-2xl font-bold text-primary-600">98%</h4>
                <p className="text-sm text-slate-500">Accuracy</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-600">1.2s</h4>
                <p className="text-sm text-slate-500">Latency</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-600">5+</h4>
                <p className="text-sm text-slate-500">Diseases</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src={heroImage}
                alt="Agriculture"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 z-20 glass-morphism p-6 rounded-2xl hidden sm:block max-w-xs animate-bounce-slow">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-600 p-3 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold">Model Verified</p>
                  <p className="text-sm text-slate-500">CNN V3.0 Optimized</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
