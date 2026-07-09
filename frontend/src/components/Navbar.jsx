import React from 'react';
import { Leaf, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold font-outfit bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              BlackGram AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#home" className="hover:text-primary-600 transition-colors">Home</a>
            <a href="#predict" className="hover:text-primary-600 transition-colors">Predict</a>
            <a href="#info" className="hover:text-primary-600 transition-colors">Disease Info</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b">
          <div className="px-4 pt-2 pb-6 space-y-4 font-medium">
            <a href="#home" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-600">Home</a>
            <a href="#predict" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-600">Predict</a>
            <a href="#info" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-600">Disease Info</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
