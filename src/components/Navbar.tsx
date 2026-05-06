import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { Profile } from '../data/movies';

interface NavbarProps {
  currentProfile: Profile;
  onSwitchProfile: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: 'home' | 'series' | 'movies' | 'mylist';
  setActiveTab: (tab: 'home' | 'series' | 'movies' | 'mylist') => void;
  myListCount: number;
  onAboutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onSwitchProfile,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  myListCount,
  onAboutClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileBrowse, setShowMobileBrowse] = useState(false);

  // Scroll handler to make navbar background turn black
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'series', label: 'TV Shows' },
    { id: 'movies', label: 'Movies' },
    { id: 'mylist', label: `My List ${myListCount > 0 ? `(${myListCount})` : ''}` }
  ] as const;

  const handleNavItemClick = (tabId: 'home' | 'series' | 'movies' | 'mylist') => {
    setActiveTab(tabId);
    setShowMobileBrowse(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out select-none ${isScrolled ? 'bg-[#141414] shadow-md' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Tabs Links */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Authentic-style Logo Text */}
          <span 
            onClick={() => handleNavItemClick('home')}
            className="text-red-600 text-2xl sm:text-3xl font-black tracking-tighter cursor-pointer select-none transition-transform hover:scale-102 active:scale-98 font-sans"
            style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
          >
            LIKFIX
          </span>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-5 text-xs lg:text-sm text-gray-300 transition-all">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavItemClick(item.id)}
                  className={`hover:text-gray-400 transition-colors cursor-pointer text-[13px] tracking-wide font-normal ${activeTab === item.id ? 'text-white font-medium pointer-events-none' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Browse Menu trigger */}
          <div className="relative md:hidden">
            <button
              onClick={() => setShowMobileBrowse(!showMobileBrowse)}
              className="text-white text-xs sm:text-sm font-medium flex items-center gap-1 cursor-pointer bg-black/20 px-3 py-1.5 rounded border border-gray-800"
            >
              <span>{navItems.find(n => n.id === activeTab)?.label || 'Browse'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMobileBrowse ? 'rotate-180' : ''}`} />
            </button>

            {showMobileBrowse && (
              <div className="absolute top-10 left-0 bg-[#141414] border border-gray-800 w-44 rounded shadow-2xl overflow-hidden py-1 animate-[fadeIn_0.2s_ease-out]">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors block ${activeTab === item.id ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Search, Notifications, Profile */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-white">
          
          {/* About Developer Button: First next to search */}
          <button
            onClick={onAboutClick}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase rounded-sm cursor-pointer shadow-lg active:scale-95 transition-all flex items-center gap-1 hover:border hover:border-white/20"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span>About Yasir</span>
          </button>
          
          {/* Interactive Search Bar wrapper */}
          <div className={`flex items-center bg-black/40 border transition-all duration-300 px-2 py-1 rounded ${isSearchExpanded || searchQuery ? 'w-40 sm:w-60 border-gray-500 bg-black/90' : 'w-8 border-transparent'}`}>
            <button 
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="text-gray-300 hover:text-white cursor-pointer p-0.5 outline-none focus:text-white"
            >
              <Search className="w-4 h-4 sm:w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Titles, people, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-xs sm:text-sm pl-2 w-full text-white placeholder-gray-500 transition-opacity duration-200 ${isSearchExpanded || searchQuery ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="text-gray-300 hover:text-white p-1 transition-colors cursor-pointer relative"
            >
              <Bell className="w-4 h-4 sm:w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border border-black" />
            </button>

            {showNotifications && (
              <div className="absolute top-10 right-0 bg-[#141414] border border-gray-800 text-xs text-gray-300 w-64 sm:w-80 rounded shadow-2xl py-2 overflow-hidden z-50 animate-[slideUp_0.2s_ease-out]">
                <div className="px-4 py-1.5 border-b border-gray-800 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  New Releases
                </div>
                <div className="divide-y divide-gray-800 max-h-60 overflow-y-auto">
                  <div className="p-3 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=60&q=80" alt="thumb" className="w-12 h-16 object-cover rounded-sm flex-shrink-0" />
                    <div className="space-y-0.5">
                      <p className="text-white font-medium">Cyberpunk: Neo Tokyo</p>
                      <p className="text-gray-400 text-[11px] line-clamp-2">Brand new sci-fi original movie just dropped tonight. Watch now!</p>
                      <p className="text-red-500 text-[9px] font-bold">New Original</p>
                    </div>
                  </div>
                  <div className="p-3 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=60&q=80" alt="thumb" className="w-12 h-16 object-cover rounded-sm flex-shrink-0" />
                    <div className="space-y-0.5">
                      <p className="text-white font-medium">Shadow of the Shogun</p>
                      <p className="text-gray-400 text-[11px] line-clamp-2">Trending #1 in movies globally. Masterful action thriller drama.</p>
                      <p className="text-gray-500 text-[9px]">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Picker Dropdown */}
          <div className="relative">
            <div 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <img
                src={currentProfile.avatarUrl}
                alt={currentProfile.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover border border-transparent group-hover:border-gray-400 transition-all"
              />
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </div>

            {showProfileMenu && (
              <div className="absolute top-10 right-0 bg-[#141414] border border-gray-800 rounded shadow-2xl py-1.5 w-44 z-50 animate-[slideUp_0.2s_ease-out]">
                <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-2 mb-1">
                  <img src={currentProfile.avatarUrl} alt="av" className="w-6 h-6 rounded object-cover" />
                  <span className="text-white text-xs font-bold truncate">{currentProfile.name}</span>
                </div>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSwitchProfile();
                  }}
                  className="w-full text-left text-xs text-gray-300 hover:bg-white/5 px-3 py-2 transition-colors flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Switch Profiles
                </button>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSwitchProfile();
                  }}
                  className="w-full text-left text-xs text-red-400 hover:bg-white/5 px-3 py-2 transition-colors flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
