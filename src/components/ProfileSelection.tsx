import React from 'react';
import { PROFILES, Profile } from '../data/movies';

interface ProfileSelectionProps {
  onSelectProfile: (profile: Profile) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelectProfile }) => {
  return (
    <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-50 overflow-y-auto px-4 py-8 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-medium mb-10 tracking-wide drop-shadow-md animate-[slideUp_0.6s_ease-out]">
          Who's watching?
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto mb-16 justify-center">
          {PROFILES.map((profile, idx) => (
            <div
              key={profile.id}
              onClick={() => onSelectProfile(profile)}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Profile Avatar Frame */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-lg">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              
              {/* Profile Name */}
              <span className="mt-4 text-gray-400 font-normal text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                {profile.name}
              </span>
            </div>
          ))}
        </div>
        
        <button className="border border-gray-500 text-gray-500 hover:text-white hover:border-white px-5 py-2 text-sm sm:text-base tracking-widest uppercase transition-all duration-300 cursor-pointer bg-transparent rounded-sm hover:bg-white/5 active:scale-98">
          Manage Profiles
        </button>
      </div>
    </div>
  );
};
