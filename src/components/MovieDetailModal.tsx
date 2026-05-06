import React, { useEffect } from 'react';
import { X, Play, Plus, Check, ThumbsUp } from 'lucide-react';
import { Movie, MOVIES_DATA } from '../data/movies';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onPlayClick: (movie: Movie, episodeNum?: number, episodeTitle?: string) => void;
  onToggleMyList: (movie: Movie) => void;
  myListIds: string[];
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onPlayClick,
  onToggleMyList,
  myListIds
}) => {
  const isBookmarked = myListIds.includes(movie.id);

  // Lock document scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Filter recommendations based on shared genres
  const recommendations = MOVIES_DATA.filter(
    (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
  ).slice(0, 3);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/75 z-50 flex items-start justify-center overflow-y-auto pt-8 sm:pt-16 pb-8 px-2 sm:px-4 select-none animate-[fadeIn_0.3s_ease-out]"
    >
      {/* Modal Dialog Shell Frame */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#181818] text-white w-full max-w-3xl rounded-md overflow-hidden shadow-2xl animate-[scaleUp_0.3s_ease-out] mb-12 border border-zinc-800"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white z-50 cursor-pointer transition-colors border border-zinc-700"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative aspect-video w-full bg-zinc-950">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Shadows vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-black/30" />
          
          {/* Overlay Title and Quick Triggers */}
          <div className="absolute bottom-6 left-4 sm:left-10 right-4 sm:right-10 flex flex-col gap-2 sm:gap-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide drop-shadow-md">
              {movie.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Play Button */}
              <button
                onClick={() => onPlayClick(movie)}
                className="flex items-center justify-center gap-2 bg-white text-black font-bold px-5 py-2 rounded shadow-md hover:bg-neutral-200 active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black text-black" />
                <span>Play</span>
              </button>

              {/* Toggle list Button */}
              <button
                onClick={() => onToggleMyList(movie)}
                className="p-2 rounded-full border border-gray-400 hover:border-white bg-black/40 text-white transition-colors cursor-pointer active:scale-90"
                title={isBookmarked ? "Remove from My List" : "Add to My List"}
              >
                {isBookmarked ? <Check className="w-4 h-4 text-green-400" /> : <Plus className="w-4 h-4" />}
              </button>

              {/* Thumbs up */}
              <button className="p-2 rounded-full border border-gray-400 hover:border-white bg-black/40 text-white transition-colors cursor-pointer active:scale-90">
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Metadata Body Layout */}
        <div className="p-4 sm:p-10 space-y-8">
          
          {/* Upper Info Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left description column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                <span className="text-green-500 font-bold">{movie.matchPercentage}% Match</span>
                <span>{movie.releaseYear}</span>
                <span className="border border-zinc-600 px-1.5 rounded-sm text-[10px] bg-zinc-900 font-mono text-zinc-300">
                  {movie.rating}
                </span>
                <span>{movie.duration}</span>
                {movie.isOriginal && (
                  <span className="text-xs text-red-500 font-bold tracking-wider uppercase bg-red-950/40 px-1.5 py-0.5 rounded-xs">Original</span>
                )}
              </div>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                {movie.description}
              </p>
            </div>

            {/* Right details column */}
            <div className="text-xs sm:text-sm space-y-2.5 border-l border-zinc-800 md:pl-6 text-zinc-400">
              <div>
                <span className="text-zinc-500 font-medium">Cast:</span>{' '}
                <span className="text-zinc-200 hover:underline cursor-pointer">{movie.cast.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">Creator:</span>{' '}
                <span className="text-zinc-200 hover:underline cursor-pointer">{movie.creator}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">Genres:</span>{' '}
                <span className="text-zinc-200">{movie.genres.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Episode Selector Shelves for TV Shows Series type */}
          {movie.type === 'series' && movie.episodes && (
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">Episodes</h3>
                <span className="text-sm font-semibold text-gray-400">Season 1</span>
              </div>

              <div className="space-y-3">
                {movie.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => onPlayClick(movie, ep.number, ep.title)}
                    className="flex flex-col sm:flex-row items-start sm:items-center p-3 rounded bg-zinc-900/30 hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-800 cursor-pointer group gap-4"
                  >
                    {/* Index Number */}
                    <span className="text-gray-500 font-bold font-mono text-base sm:text-lg sm:w-4 text-center block">
                      {ep.number}
                    </span>

                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-36 aspect-video bg-zinc-950 rounded overflow-hidden relative flex-shrink-0 shadow">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                        <div className="p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 fill-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white text-sm font-bold tracking-wide group-hover:text-red-400 transition-colors">
                          {ep.title}
                        </h4>
                        <span className="text-xs text-gray-500 font-mono font-medium">{ep.duration}</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Recommendations "More Like This" Section */}
          {recommendations.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h3 className="text-lg sm:text-xl font-bold tracking-wide">More Like This</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      // Switch focus to this movie inside the modal
                      // First trigger scroll to top
                      const scrollContainer = document.querySelector('.fixed.inset-0.overflow-y-auto');
                      if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                      // Replace modal contents by code selection trick or trigger prop chain update
                      // For standard safety we let the app update its modal target or click handles
                      // For ultra responsiveness we just play it or show it. Let's make it trigger full play/info hook
                      onPlayClick(rec);
                    }}
                    className="bg-[#2f2f2f]/30 border border-zinc-800/80 rounded overflow-hidden cursor-pointer group hover:bg-[#2f2f2f]/60 transition-all flex flex-col"
                  >
                    <div className="aspect-video relative bg-zinc-900">
                      <img src={rec.thumbnailUrl} alt={rec.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 text-[10px] bg-black/70 px-1.5 py-0.5 rounded font-bold text-zinc-300 border border-zinc-800">{rec.rating}</span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-green-400">
                          <span>{rec.matchPercentage}% Match</span>
                          <span className="text-gray-400 font-normal">{rec.releaseYear}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm truncate group-hover:text-red-400 transition-colors">{rec.title}</h4>
                      </div>
                      <p className="text-zinc-400 text-[11px] line-clamp-2 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
