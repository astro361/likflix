import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../data/movies';

interface BillboardProps {
  featuredMovie: Movie;
  onPlayClick: (movie: Movie) => void;
  onMoreInfoClick: (movie: Movie) => void;
}

export const Billboard: React.FC<BillboardProps> = ({
  featuredMovie,
  onPlayClick,
  onMoreInfoClick
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoPlayStarted, setVideoPlayStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger delayed video playback for the cinematic billboard background
  useEffect(() => {
    setVideoPlayStarted(false);
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => setVideoPlayStarted(true))
          .catch(() => setVideoPlayStarted(false));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [featuredMovie]);

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-[480px] sm:h-[65vh] md:h-[80vh] lg:h-[85vh] w-full bg-black select-none overflow-hidden text-white">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster Image Backdrop (always visible initially or as fallback) */}
        <img
          src={featuredMovie.backdropUrl}
          alt={featuredMovie.title}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${videoPlayStarted ? 'opacity-0 md:opacity-0' : 'opacity-100'}`}
        />
        
        {/* Hidden on mobile for data-saving/performance; auto looping background trailer for tablets/desktops */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={featuredMovie.videoUrl}
            muted={isMuted}
            loop
            playsInline
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${videoPlayStarted ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Multi-layered cinematic darkness shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />
      </div>

      {/* Content Overlay Panel */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 max-w-2xl sm:max-w-3xl">
        <div className="space-y-3 sm:space-y-4 md:space-y-5 animate-[slideUp_0.7s_ease-out]">
          
          {/* Likfix Original Tag */}
          {featuredMovie.isOriginal && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-red-600 font-extrabold text-xl sm:text-2xl tracking-tighter drop-shadow">L</span>
              <span className="text-gray-300 font-bold tracking-widest text-[10px] sm:text-xs uppercase">Original Series</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide drop-shadow-md text-white line-clamp-2">
            {featuredMovie.title}
          </h1>

          {/* Row specs */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-200">
            <span className="text-green-500">{featuredMovie.matchPercentage}% Match</span>
            <span className="border border-gray-500 px-1 rounded text-[10px]">{featuredMovie.rating}</span>
            <span>{featuredMovie.duration}</span>
            <span className="text-gray-400 font-normal">{featuredMovie.genres.slice(0, 2).join(' • ')}</span>
          </div>

          {/* Brief Description Summary (Truncates gracefully on tiny viewports) */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-sm font-normal line-clamp-3 md:line-clamp-4 max-w-xl text-stone-200">
            {featuredMovie.description}
          </p>

          {/* Trigger Action Control Panel Bar */}
          <div className="flex items-center justify-between w-full pt-1 sm:pt-2">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play Button */}
              <button
                onClick={() => onPlayClick(featuredMovie)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-black font-bold px-4 sm:px-6 py-2 rounded shadow-md hover:bg-neutral-200 active:scale-95 transition-all duration-200 text-xs sm:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black" />
                <span>Play</span>
              </button>

              {/* More Info Button */}
              <button
                onClick={() => onMoreInfoClick(featuredMovie)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-zinc-500/60 text-white font-bold px-4 sm:px-6 py-2 rounded shadow-md hover:bg-zinc-600/70 active:scale-95 transition-all duration-200 text-xs sm:text-base backdrop-blur-xs cursor-pointer"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>More Info</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom-Right Sound control badge (synchronized with video status) */}
      <div className="hidden md:flex absolute bottom-24 right-0 z-20 items-center gap-4 pr-12">
        <button
          onClick={handleMuteToggle}
          className="p-2 bg-black/40 border border-gray-600 rounded-full hover:bg-black/70 transition-colors text-white cursor-pointer"
          title={isMuted ? "Unmute audio loop" : "Mute audio loop"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <span className="border-l-4 border-gray-400 bg-black/40 pl-3 pr-6 py-1 text-xs font-semibold tracking-wider uppercase text-gray-300">
          {featuredMovie.rating}
        </span>
      </div>

    </div>
  );
};
