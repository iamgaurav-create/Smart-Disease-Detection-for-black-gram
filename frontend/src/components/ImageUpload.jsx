import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ onPredictionResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, JPEG).');
        return;
      }
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      // Real API Call
      const response = await axios.post('http://localhost:5001/predict', formData);
      onPredictionResult(response.data);
      
    } catch (err) {
      setError('Server Error: Unable to connect to the prediction engine. Please ensure the backend (Python/Flask) is running at http://localhost:5000.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError('Please drop a valid image file.');
    }
  };

  return (
    <section id="predict" className="section-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Start Prediction</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Upload a high-quality image of a Black Gram leaf to identify potential diseases.
          </p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 lg:p-12 relative">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all group"
              >
                <div className="bg-primary-100 dark:bg-primary-900/40 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop Image</h3>
                <p className="text-slate-500 text-center mb-6">
                  or click to browse from your device
                </p>
                <div className="flex space-x-2 text-xs text-slate-400">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">JPG</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">PNG</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">JPEG</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <img src={preview} alt="Preview" className="max-h-full object-contain" />
                  <button
                    onClick={clearImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handlePredict}
                    disabled={isLoading}
                    className="btn-primary flex items-center justify-center min-w-[200px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Predict Disease
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-start space-x-3 border border-red-100 dark:border-red-900/30"
            >
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
