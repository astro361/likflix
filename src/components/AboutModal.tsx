import React, { useEffect } from 'react';
import { X, MapPin, Phone, Mail, Award, Heart } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  // Lock scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out] select-none"
    >
      {/* Container Frame */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#181818] border border-red-600/30 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl text-white animate-[zoomIn_0.3s_ease-out]"
      >
        {/* Custom Header with red/dark gradient */}
        <div className="bg-gradient-to-r from-red-800 to-zinc-900 px-6 py-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/80 rounded-full text-white cursor-pointer transition-colors border border-white/10"
            title="Close Info"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-3xl font-black shadow-lg border-2 border-white/20">
              Y
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-red-300 font-bold">Lead Developer & Designer</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Yasir</h2>
            </div>
          </div>
        </div>

        {/* Info Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-500" />
              Creator Information
            </h3>

            {/* Location block */}
            <div className="flex items-start gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 animate-bounce" />
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase">Location</p>
                <p className="text-sm font-medium text-white">Palakkad Cheruppulassery</p>
                <p className="text-xs text-zinc-400">Kerala, India</p>
              </div>
            </div>

            {/* Phone contact block */}
            <a 
              href="tel:+919539213484" 
              className="flex items-start gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 hover:border-red-600/40 hover:bg-zinc-800/40 transition-all cursor-pointer block group"
            >
              <Phone className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase">Direct Call / WhatsApp</p>
                <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">+91 9539213484</p>
                <p className="text-[11px] text-zinc-400">Available for freelance & web development opportunities</p>
              </div>
            </a>

            {/* Email contact block */}
            <a 
              href="mailto:yasirnc678@gmail.com" 
              className="flex items-start gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 hover:border-red-600/40 hover:bg-zinc-800/40 transition-all cursor-pointer block group"
            >
              <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase">Email Address</p>
                <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">yasirnc678@gmail.com</p>
                <p className="text-[11px] text-zinc-400">Direct response within 24 hours</p>
              </div>
            </a>
          </div>

          {/* Slogan */}
          <div className="pt-2 text-center border-t border-zinc-800 space-y-2">
            <p className="text-xs text-zinc-400 italic">
              "Crafting premium cinematic streaming experiences with high-performance modern web technologies."
            </p>
            <div className="flex items-center justify-center gap-1.5 text-red-500 font-bold text-xs">
              <Heart className="w-3.5 h-3.5 fill-red-500" />
              <span>Made by Yasir for Likfix</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-zinc-900/80 px-6 py-4 flex justify-between items-center border-t border-zinc-800">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">LIKFIX PLATFORM v2.0</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition-colors cursor-pointer"
          >
            Back to Streaming
          </button>
        </div>
      </div>
    </div>
  );
};
