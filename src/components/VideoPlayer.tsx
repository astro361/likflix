import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, ArrowLeft, Sliders } from 'lucide-react';
import { Movie } from '../data/movies';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
  episodeNumber?: number;
  episodeTitle?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose, episodeNumber, episodeTitle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  // Hide controls timer on mouse inactivity
  useEffect(() => {
    let timeoutId: number;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
          setShowSpeedMenu(false);
        }
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    handleMouseMove(); // Trigger initial view

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const skip = (amount: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += amount;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsLoading(false);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
    if (!nextMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    const minStr = minutes.toString().padStart(2, '0');
    const secStr = seconds.toString().padStart(2, '0');
    
    if (hours > 0) {
      return `${hours}:${minStr}:${secStr}`;
    }
    return `${minStr}:${secStr}`;
  };

  const timeRemaining = duration - currentTime;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center select-none overflow-hidden text-white"
    >
      {/* Actual HTML Video Tag */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onClick={togglePlay}
        loop
      />

      {/* Loading Spinner Overlaid */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20 pointer-events-none">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 text-sm tracking-widest font-medium">BUFFERING...</p>
        </div>
      )}

      {/* Cinematic Overlays (Controls) */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/70 flex flex-col justify-between transition-opacity duration-500 z-10 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Top Bar Navigation */}
        <div className="p-4 sm:p-6 flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 text-white hover:text-gray-300 transition-colors cursor-pointer rounded-full hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Watching</div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-wide">
              {movie.title}
              {episodeNumber && episodeTitle && (
                <span className="text-gray-300 font-medium text-sm sm:text-lg block sm:inline sm:ml-3">
                  S1:E{episodeNumber} &ldquo;{episodeTitle}&rdquo;
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Center Quick Skip Indicator Helper (Hidden on tiny screens) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-4 bg-black/50 rounded-full text-white"><RotateCcw className="w-10 h-10" /></button>
          <button className="p-4 bg-black/50 rounded-full text-white"><RotateCw className="w-10 h-10" /></button>
        </div>

        {/* Bottom Panel Controls */}
        <div className="p-4 sm:p-6 space-y-4">
          
          {/* Seeker Progress Slider */}
          <div className="flex items-center gap-3 group">
            <span className="text-xs sm:text-sm font-mono text-gray-300 min-w-[45px] text-right">
              {formatTime(currentTime)}
            </span>
            
            <div className="flex-1 relative flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-1 sm:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-2 transition-all duration-150 outline-none"
                style={{
                  background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            <span className="text-xs sm:text-sm font-mono text-gray-300 min-w-[55px]">
              -{formatTime(timeRemaining)}
            </span>
          </div>

          {/* Buttons Navigation Deck */}
          <div className="flex items-center justify-between">
            {/* Left Controls cluster */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Play / Pause */}
              <button 
                onClick={togglePlay}
                className="p-2 text-white hover:text-red-500 transition-colors cursor-pointer rounded-full hover:bg-white/10"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-white" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />}
              </button>

              {/* Rewind 10s */}
              <button 
                onClick={() => skip(-10)}
                className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Rewind 10s"
              >
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Fast Forward 10s */}
              <button 
                onClick={() => skip(10)}
                className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Forward 10s"
              >
                <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Volume Controller Cluster */}
              <div className="flex items-center gap-2 group/volume">
                <button 
                  onClick={toggleMute}
                  className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-0 overflow-hidden group-hover/volume:w-16 sm:group-hover/volume:w-24 transition-all duration-300 h-1 appearance-none bg-gray-600 rounded-sm accent-white cursor-pointer"
                />
              </div>
            </div>

            {/* Right Controls cluster */}
            <div className="flex items-center gap-3 sm:gap-5 relative">
              {/* Speed Controller Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-2 py-1 border border-gray-400 rounded-sm text-xs font-bold hover:text-white hover:border-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{playbackRate}x</span>
                  <Sliders className="w-3 h-3" />
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-10 right-0 bg-[#181818] border border-gray-800 rounded shadow-2xl py-1 w-24 text-center z-30 animate-[slideUp_0.2s_ease-out]">
                    {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changeSpeed(rate)}
                        className={`w-full block text-xs py-2 hover:bg-red-600 font-medium transition-colors ${playbackRate === rate ? 'text-red-500 hover:text-white font-bold' : 'text-gray-300'}`}
                      >
                        {rate === 1 ? 'Normal' : `${rate}x`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Trigger */}
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
                title="Fullscreen Toggle"
              >
                <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
