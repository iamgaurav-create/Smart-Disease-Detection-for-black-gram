import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, ArrowRight } from 'lucide-react';

const ResultCard = ({ result, onReset }) => {
  if (!result) return null;

  const isHealthy = result.status === 'healthy';
  const isUnrecognized = result.status === 'unrecognized';

  let cardStyles = 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-900 dark:text-red-100';
  let accentColor = 'text-red-500';
  let badgeColor = 'text-red-600';
  let badgeText = 'Warning: Disease Detected';

  if (isHealthy) {
    cardStyles = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-100';
    accentColor = 'text-emerald-500';
    badgeColor = 'text-emerald-600';
    badgeText = 'No Issues Detected';
  } else if (isUnrecognized) {
    cardStyles = 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-100';
    accentColor = 'text-amber-500';
    badgeColor = 'text-amber-600';
    badgeText = 'Invalid Subject';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-12"
    >
      <div className={`rounded-3xl p-8 border-2 transition-all ${cardStyles}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className={`p-6 rounded-2xl ${isHealthy ? 'bg-emerald-500/10' : isUnrecognized ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
            {isHealthy ? (
              <CheckCircle2 className={`h-16 w-16 ${accentColor}`} />
            ) : isUnrecognized ? (
              <Info className={`h-16 w-16 ${accentColor}`} />
            ) : (
              <AlertTriangle className={`h-16 w-16 ${accentColor}`} />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <span className={`text-sm font-bold uppercase tracking-wider mb-2 block ${badgeColor}`}>
                  {badgeText}
                </span>
                <h3 className="text-3xl font-bold font-outfit">{result.disease}</h3>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
                <span className="text-sm opacity-60">Confidence</span>
                <span className="text-3xl font-bold">{result.confidence}%</span>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-900/50 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 mt-1 flex-shrink-0 text-primary-600" />
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {isHealthy 
                    ? 'The plant leaf appears healthy. Continue regular monitoring and follow standard agricultural practices to maintain crop health.' 
                    : isUnrecognized
                      ? (result.message || 'The system could not confidently identify a Black Gram leaf in this image. Please ensure you are uploading a clear, well-lit photo of a Black Gram leaf.')
                      : 'The model has identified signs of disease. We recommend consulting with an agricultural expert or referring to the information section below for management tips.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onReset}
                className="btn-secondary flex-1 py-3"
              >
                Upload New Image
              </button>
              <a
                href="#info"
                className="btn-primary flex-1 py-3 flex items-center justify-center"
              >
                Management Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
