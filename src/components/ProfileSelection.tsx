<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Profile, SUGGESTED_GENRES } from '../data/movies';
import { Plus, Check, Heart } from 'lucide-react';
=======
import React from 'react';
import { PROFILES, Profile } from '../data/movies';
>>>>>>> da19bac9cad22ff1e0c11483c21a83dc60156faf

interface ProfileSelectionProps {
  onSelectProfile: (profile: Profile) => void;
}

<<<<<<< HEAD
const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80'
];

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Create profile form states
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Load existing profiles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('likfix_profiles');
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (e) {
        setProfiles([]);
      }
    } else {
      // Force creation if no profiles exist
      setIsCreating(true);
    }
  }, []);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a profile name.');
      return;
    }
    if (selectedGenres.length === 0) {
      setErrorMsg('Please select at least one favorite movie category.');
      return;
    }

    const newProfile: Profile = {
      id: `profile-${Date.now()}`,
      name: name.trim(),
      avatarUrl: selectedAvatar,
      preferredGenres: selectedGenres
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('likfix_profiles', JSON.stringify(updatedProfiles));
    
    // Select this newly created profile and launch!
    onSelectProfile(newProfile);
  };

  return (
    <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-50 overflow-y-auto px-4 py-12 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-4xl w-full text-center">
        
        {/* State A: Browse / Select Profiles */}
        {!isCreating && profiles.length > 0 && (
          <div className="space-y-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-wide drop-shadow-md animate-[slideUp_0.6s_ease-out]">
              Who's watching?
            </h1>
            
            <div className="flex flex-wrap gap-8 justify-center max-w-3xl mx-auto">
              {profiles.map((profile, idx) => (
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
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                  
                  {/* Profile Name */}
                  <span className="mt-4 text-gray-400 font-normal text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                    {profile.name}
                  </span>
                </div>
              ))}

              {/* Add New Profile Slot Card */}
              <div
                onClick={() => {
                  setName('');
                  setSelectedGenres([]);
                  setErrorMsg('');
                  setIsCreating(true);
                }}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-md border-2 border-dashed border-gray-600 group-hover:border-white group-hover:bg-zinc-800 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 active:scale-95">
                  <Plus className="w-10 h-10 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <span className="mt-4 text-gray-500 font-normal text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                  Add Profile
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => {
                  setName('');
                  setSelectedGenres([]);
                  setErrorMsg('');
                  setIsCreating(true);
                }}
                className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-5 py-2 text-sm sm:text-base tracking-widest uppercase transition-all duration-300 cursor-pointer bg-transparent rounded-sm hover:bg-white/5"
              >
                Create New Profile
              </button>
            </div>
          </div>
        )}

        {/* State B: Create / Edit Profile Form with suggested favorite categories */}
        {isCreating && (
          <div className="max-w-2xl mx-auto bg-zinc-900/60 border border-zinc-800 p-6 sm:p-10 rounded-lg shadow-2xl text-left animate-[zoomIn_0.3s_ease-out]">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-7 bg-red-600 rounded-xs block" />
              Create Profile
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              Add a profile for another person watching Likfix to customize their favorite movie categories.
            </p>

            <form onSubmit={handleCreateProfile} className="space-y-6 sm:space-y-8">
              {/* Profile Name & Avatar Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-zinc-800">
                {/* Active Avatar Preview */}
                <div className="w-24 h-24 rounded overflow-hidden border-2 border-red-600 shadow-md flex-shrink-0">
                  <img src={selectedAvatar} alt="preview" className="w-full h-full object-cover" />
                </div>
                
                {/* Name Input */}
                <div className="flex-1 w-full space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Profile Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMsg('');
                    }}
                    maxLength={15}
                    placeholder="Enter name (e.g. Alex, Sarah)"
                    className="w-full bg-[#333] border border-transparent focus:border-red-600 text-white px-4 py-2.5 rounded text-sm sm:text-base outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Avatar Selector Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Choose Avatar</label>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                  {AVATARS.map((av) => (
                    <div
                      key={av}
                      onClick={() => setSelectedAvatar(av)}
                      className={`aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 ${selectedAvatar === av ? 'border-red-600 scale-102 shadow-lg shadow-red-950' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={av} alt="avatar option" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions Favorite Categories Toggle Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    Favorite Categories
                  </label>
                  <span className="text-[10px] text-gray-500 font-bold">Pick at least 1 category</span>
                </div>

                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-none pb-2 border-b border-zinc-800">
                  {SUGGESTED_GENRES.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => {
                          handleGenreToggle(genre);
                          setErrorMsg('');
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${isSelected ? 'bg-red-600 text-white border-red-600 font-bold' : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border-zinc-700'}`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{genre}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <p className="text-xs font-bold text-red-500 animate-pulse bg-red-950/20 px-3 py-2 rounded border border-red-900/40">
                  {errorMsg}
                </p>
              )}

              {/* Form Actions */}
              <div className="flex items-center gap-3 justify-end pt-4">
                {profiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-5 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors rounded text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xs sm:text-sm transition-colors cursor-pointer shadow-lg active:scale-95"
                >
                  Save & Continue
                </button>
              </div>

            </form>
          </div>
        )}

=======
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
>>>>>>> da19bac9cad22ff1e0c11483c21a83dc60156faf
      </div>
    </div>
  );
};
