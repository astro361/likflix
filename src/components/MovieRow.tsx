import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check, ThumbsUp, Info } from 'lucide-react';
import { Movie } from '../data/movies';

export const MovieRow: React.FC<{
  title: string;
  movies: Movie[];
  onPlayClick: (movie: Movie) => void;
  onMoreInfoClick: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  myListIds: string[];
}> = ({ title, movies, onPlayClick, onMoreInfoClick, onToggleMyList, myListIds }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  if (movies.length === 0) return null;

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
      
      // Toggle visibility of left arrow
      setShowLeftArrow(scrollLeft + scrollAmount > 10);
    }
  };

  const handleRowScrollEvent = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 10);
    }
  };

  return (
    <div className="space-y-1 sm:space-y-2 px-4 sm:px-8 md:px-12 lg:px-16 relative select-none group/row">
      {/* Category Row Title */}
      <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-wide transition-colors duration-200 group-hover/row:text-neutral-100 font-sans pt-4">
        {title}
      </h2>

      {/* Slide Carousel Track wrapper */}
      <div className="relative">
        {/* Left Indicator Arrow */}
        <button
          onClick={() => handleScroll('left')}
          className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-black/50 hover:bg-black/80 text-white z-30 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 rounded-r cursor-pointer ${showLeftArrow ? 'block' : 'hidden pointer-events-none'}`}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          onScroll={handleRowScrollEvent}
          className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {movies.map((movie) => {
            const isBookmarked = myListIds.includes(movie.id);
            const isHovered = hoveredCardId === movie.id;

            return (
              <div
                key={movie.id}
                onMouseEnter={() => setHoveredCardId(movie.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="relative w-[140px] sm:w-[200px] md:w-[240px] flex-shrink-0 snap-start rounded-sm cursor-pointer transition-transform duration-300 ease-out"
              >
                {/* Main Card View */}
                <div 
                  onClick={() => onMoreInfoClick(movie)}
                  className="w-full aspect-video rounded overflow-hidden bg-zinc-900 shadow-md relative transform group-hover:shadow-xl transition-all"
                >
                  <img
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Subtle lower vignette title overlay for mobile view stability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-100 md:opacity-0 transition-opacity flex items-end p-2">
                    <span className="text-white font-bold text-[10px] sm:text-xs truncate w-full">{movie.title}</span>
                  </div>
                </div>

                {/* Desktop Premium Expansion Card Overlay on Hover */}
                {isHovered && (
                  <div className="hidden md:block absolute -top-12 -left-6 w-[280px] md:w-[300px] bg-[#181818] rounded shadow-2xl z-40 animate-[zoomIn_0.2s_ease-out] border border-zinc-800">
                    
                    {/* Media Thumbnail */}
                    <div 
                      onClick={() => onMoreInfoClick(movie)}
                      className="w-full aspect-video relative rounded-t overflow-hidden bg-zinc-950"
                    >
                      <img
                        src={movie.thumbnailUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />
                    </div>

                    {/* Meta Payload Container */}
                    <div className="p-4 space-y-3">
                      {/* Interactive Buttons Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Play circle tool */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayClick(movie);
                            }}
                            className="p-2 bg-white rounded-full text-black hover:bg-neutral-200 transition-colors shadow cursor-pointer active:scale-90"
                            title="Instant Play Video"
                          >
                            <Play className="w-4 h-4 fill-black text-black" />
                          </button>
                          
                          {/* My list action tool */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleMyList(movie);
                            }}
                            className={`p-2 rounded-full border text-white transition-colors cursor-pointer active:scale-90 ${isBookmarked ? 'border-green-500 bg-zinc-800/80 text-green-400' : 'border-gray-500 hover:border-white bg-zinc-900/50'}`}
                            title={isBookmarked ? "Remove from My List" : "Add to My List"}
                          >
                            {isBookmarked ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                          </button>

                          {/* Thumbs up tool */}
                          <button 
                            onClick={(e) => e.stopPropagation()} 
                            className="p-2 rounded-full border border-gray-500 hover:border-white text-white transition-colors cursor-pointer active:scale-90 bg-zinc-900/50"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                        </div>

                        {/* More Info Detail modal hook */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMoreInfoClick(movie);
                          }}
                          className="p-2 rounded-full border border-gray-500 hover:border-white text-white transition-colors cursor-pointer bg-zinc-900/50"
                          title="Detailed Synopses"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Video Specifications Tag list */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-green-500">{movie.matchPercentage}% Match</span>
                          <span className="text-stone-300 font-semibold">{movie.releaseYear}</span>
                          <span className="border border-zinc-600 px-1 rounded text-[9px] bg-zinc-900 text-zinc-300">{movie.rating}</span>
                          <span className="text-zinc-400">{movie.duration}</span>
                        </div>
                        <h4 className="text-white text-sm font-bold truncate">{movie.title}</h4>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {movie.genres.map((g) => (
                            <span key={g} className="text-[10px] bg-zinc-900 text-gray-400 px-1.5 py-0.5 rounded-sm font-medium">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Right Indicator Arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-black/50 hover:bg-black/80 text-white z-30 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 rounded-l cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
