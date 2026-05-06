import { useState } from 'react';
import { ProfileSelection } from './components/ProfileSelection';
import { Navbar } from './components/Navbar';
import { Billboard } from './components/Billboard';
import { MovieRow } from './components/MovieRow';
import { MovieDetailModal } from './components/MovieDetailModal';
import { VideoPlayer } from './components/VideoPlayer';
import { AboutModal } from './components/AboutModal';
import { MOVIES_DATA, CATEGORIES, Movie, Profile } from './data/movies';
import { Film, Plus, RefreshCw } from 'lucide-react';

export default function App() {
  // Authentication / Active profile selector state
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  // Navigation / Search and row filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'series' | 'movies' | 'mylist'>('home');
  
  // Custom interactive user parameters state
  const [myListIds, setMyListIds] = useState<string[]>(['stranger-woods', 'cyber-neo']); // Seed some items
  const [activePlayingMovie, setActivePlayingMovie] = useState<Movie | null>(null);
  const [playingEpisodeMeta, setPlayingEpisodeMeta] = useState<{ number: number; title: string } | null>(null);
  const [selectedDetailMovie, setSelectedDetailMovie] = useState<Movie | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Profile selection triggers
  const handleSelectProfile = (profile: Profile) => {
    setCurrentProfile(profile);
    // Reset inputs on profile switch
    setSearchQuery('');
    setActiveTab('home');
  };

  // Bookmark checklist modifier toggler
  const handleToggleMyList = (movie: Movie) => {
    setMyListIds((prev) =>
      prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
    );
  };

  // Video launch handlers
  const handleOpenPlayer = (movie: Movie, episodeNum?: number, episodeTitle?: string) => {
    if (episodeNum && episodeTitle) {
      setPlayingEpisodeMeta({ number: episodeNum, title: episodeTitle });
    } else {
      setPlayingEpisodeMeta(null);
    }
    setActivePlayingMovie(movie);
  };

  // Choose appropriate Hero Billboard content dynamically based on selected category tab
  const getFeaturedBillboardMovie = (): Movie => {
    if (activeTab === 'series') {
      const series = MOVIES_DATA.filter((m) => m.type === 'series');
      return series[0] || MOVIES_DATA[0];
    }
    if (activeTab === 'movies') {
      const films = MOVIES_DATA.filter((m) => m.type === 'movie');
      return films[0] || MOVIES_DATA[0];
    }
    // Default home billboard
    return MOVIES_DATA[0];
  };

  // Filter content catalog dynamically
  const filteredMoviesBySearch = MOVIES_DATA.filter((movie) => {
    const matchStr = `${movie.title} ${movie.description} ${movie.genres.join(' ')}`.toLowerCase();
    return matchStr.includes(searchQuery.toLowerCase());
  });

  const bookmarkedMovies = MOVIES_DATA.filter((m) => myListIds.includes(m.id));

  // Determine what list layout shelves to present
  const renderContentShelves = () => {
    // If active query search exists, return single responsive layout gallery grid
    if (searchQuery) {
      return (
        <div className="pt-24 px-4 sm:px-8 md:px-12 lg:px-16 space-y-6 min-h-[70vh]">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-400">
            Search results for: <span className="text-white">&ldquo;{searchQuery}&rdquo;</span>
          </h2>
          
          {filteredMoviesBySearch.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 pt-4">
              {filteredMoviesBySearch.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedDetailMovie(movie)}
                  className="group relative bg-[#181818] rounded overflow-hidden shadow-md cursor-pointer hover:scale-105 active:scale-98 transition-all duration-200 flex flex-col"
                >
                  <div className="aspect-video w-full bg-zinc-900 relative">
                    <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors" />
                    <span className="absolute bottom-2 left-2 text-[9px] sm:text-[11px] font-bold text-green-400 bg-black/60 px-1.5 py-0.5 rounded">
                      {movie.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-900 flex-1 flex flex-col justify-between">
                    <h4 className="text-white text-xs sm:text-sm font-bold truncate group-hover:text-red-500 transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-2">
                      {movie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
                <Film className="w-8 h-8" />
              </div>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                We couldn't find any matches for your current keyword query. Try searching for different genres like "Sci-Fi", "Action", or "Documentary".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1.5 mx-auto pt-2"
              >
                <RefreshCw className="w-3 h-3" /> Clear filter
              </button>
            </div>
          )}
        </div>
      );
    }

    // Tab view: My List Grid element
    if (activeTab === 'mylist') {
      return (
        <div className="pt-24 px-4 sm:px-8 md:px-12 lg:px-16 min-h-[75vh] space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-wide text-white">My Bookmark List</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Your curated personal watch list across premium devices.</p>
          </div>

          {bookmarkedMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 pt-2">
              {bookmarkedMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedDetailMovie(movie)}
                  className="group relative bg-[#181818] rounded overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-all duration-200"
                >
                  <div className="aspect-video w-full relative bg-zinc-900">
                    <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 border border-zinc-700 bg-black/80 px-1 rounded text-[9px] font-mono font-bold">
                      {movie.rating}
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-900">
                    <h4 className="text-white text-xs sm:text-sm font-bold truncate group-hover:text-red-400 transition-colors">
                      {movie.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1.5">
                      <span className="text-green-400 font-bold">{movie.matchPercentage}% Match</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <div className="w-12 h-12 bg-zinc-900 border border-dashed border-zinc-700 rounded-full flex items-center justify-center mx-auto text-zinc-500">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-sm">Your list is currently empty</h3>
              <p className="text-gray-500 text-xs max-w-xs mx-auto">
                Explore original TV shows and blockbuster movies, then hover or tap the &ldquo;+&rdquo; button to bookmark elements here.
              </p>
              <button
                onClick={() => setActiveTab('home')}
                className="mt-2 text-xs font-semibold px-4 py-2 bg-white text-black rounded hover:bg-neutral-200 transition-colors"
              >
                Browse Home
              </button>
            </div>
          )}
        </div>
      );
    }

    // Default categorized shelf system rows based on chosen category tab filters
    const baseMovies =
      activeTab === 'series'
        ? MOVIES_DATA.filter((m) => m.type === 'series')
        : activeTab === 'movies'
        ? MOVIES_DATA.filter((m) => m.type === 'movie')
        : MOVIES_DATA;

<<<<<<< HEAD
    // Filter personalized movies matching at least one preferred genre chosen by the active profile
    const personalizedMovies = baseMovies.filter((movie) =>
      movie.genres.some((genre) => currentProfile?.preferredGenres.includes(genre))
    );

    return (
      <div className="pb-24 -mt-12 sm:-mt-20 md:-mt-28 relative z-30 space-y-8 sm:space-y-12">
        {/* Dynamic Personalized Shelf Row based on profile liked categories selection */}
        {personalizedMovies.length > 0 && activeTab === 'home' && (
          <MovieRow
            title={`Just For ${currentProfile?.name} (Your Liked Genres)`}
            movies={personalizedMovies}
            onPlayClick={(m) => handleOpenPlayer(m)}
            onMoreInfoClick={(m) => setSelectedDetailMovie(m)}
            onToggleMyList={handleToggleMyList}
            myListIds={myListIds}
          />
        )}

=======
    return (
      <div className="pb-24 -mt-12 sm:-mt-20 md:-mt-28 relative z-30 space-y-8 sm:space-y-12">
>>>>>>> da19bac9cad22ff1e0c11483c21a83dc60156faf
        {CATEGORIES.map((cat) => {
          // Compute category movies array
          const catMovies = baseMovies.filter(cat.filter);
          
          return (
            <MovieRow
              key={cat.id}
              title={activeTab !== 'home' ? `${activeTab === 'series' ? 'TV' : 'Movie'} - ${cat.title}` : cat.title}
              movies={catMovies}
              onPlayClick={(m) => handleOpenPlayer(m)}
              onMoreInfoClick={(m) => setSelectedDetailMovie(m)}
              onToggleMyList={handleToggleMyList}
              myListIds={myListIds}
            />
          );
        })}
      </div>
    );
  };

  // If no profile active, display authentication gating screen
  if (!currentProfile) {
    return <ProfileSelection onSelectProfile={handleSelectProfile} />;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden antialiased">
      {/* Top Floating Header Controls */}
      <Navbar
        currentProfile={currentProfile}
        onSwitchProfile={() => setCurrentProfile(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myListCount={myListIds.length}
        onAboutClick={() => setShowAboutModal(true)}
      />

      {/* Main Streaming Screen Display */}
      <main className="w-full">
        {/* Only showcase full banner billboard if the user isn't searching text or viewing their list */}
        {!searchQuery && activeTab !== 'mylist' && (
          <Billboard
            featuredMovie={getFeaturedBillboardMovie()}
            onPlayClick={(m) => handleOpenPlayer(m)}
            onMoreInfoClick={(m) => setSelectedDetailMovie(m)}
          />
        )}

        {/* Dynamic content shelves grid selector block */}
        {renderContentShelves()}
      </main>

      {/* Persistent global responsive premium branding footer bar */}
      <footer className="border-t border-zinc-900 bg-[#111111] py-8 text-center text-xs text-zinc-600 select-none space-y-2 px-4">
        <div className="flex items-center justify-center gap-4 text-zinc-500 font-medium mb-2 flex-wrap">
          <span className="hover:underline cursor-pointer">Audio Description</span>
          <span className="hover:underline cursor-pointer">Help Center</span>
          <span className="hover:underline cursor-pointer">Gift Cards</span>
          <span className="hover:underline cursor-pointer">Terms of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Statement</span>
        </div>
        <p className="tracking-wide">© 2026 LIKFIX Entertainment Inc.</p>
        <p className="text-zinc-700 text-[10px]">Optimized for mobile viewports, tablet resolutions, and 4K desktop layouts.</p>
      </footer>

      {/* Fullscreen Takeover Media Stream Video Player Component */}
      {activePlayingMovie && (
        <VideoPlayer
          movie={activePlayingMovie}
          onClose={() => setActivePlayingMovie(null)}
          episodeNumber={playingEpisodeMeta?.number}
          episodeTitle={playingEpisodeMeta?.title}
        />
      )}

      {/* In-depth Meta Description Drawer Modal Component */}
      {selectedDetailMovie && (
        <MovieDetailModal
          movie={selectedDetailMovie}
          onClose={() => setSelectedDetailMovie(null)}
          onPlayClick={handleOpenPlayer}
          onToggleMyList={handleToggleMyList}
          myListIds={myListIds}
        />
      )}

      {/* About Developer Modal Trigger */}
      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
}
