import React from 'react';
import { Globe, Send, Share2, Heart, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold font-outfit bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">BlackGram AI</span>
            </div>
            <p className="text-slate-800 dark:text-slate-600 max-w-sm mb-8 leading-relaxed">
              Empowering farmers with AI-driven plant disease diagnostics. Our mission is to enhance crop yield through advanced technology and accessible intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-primary-600 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-primary-600 transition-colors">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-primary-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 hover:text-yellow-600 cursor-pointer transition-colors">Quick Links</h4>
            <ul className="space-y-4 text-slate-800 dark:text-slate-600">
              <li><a href="#home" className="hover:text-primary-600 transition-colors">Home</a></li>
              <li><a href="#predict" className="hover:text-primary-600 transition-colors">Predict</a></li>
              <li><a href="#info" className="hover:text-primary-600 transition-colors">Management</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 hover:text-yellow-600 cursor-pointer transition-colors">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 md:mt-5 -mb-16 border-t border-slate-100 dark:border-slate-900 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} BlackGram AI. All rights reserved.</p>
          <p className="flex items-center ">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> for Agriculture
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
