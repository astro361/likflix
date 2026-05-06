export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  number: number;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  videoUrl: string;
  duration: string;
  releaseYear: string;
  rating: string;
  matchPercentage: number;
  genres: string[];
  isOriginal?: boolean;
  type: 'movie' | 'series';
  cast: string[];
  creator: string;
  episodes?: Episode[];
}

export const MOVIES_DATA: Movie[] = [
  {
    id: 'cyber-neo',
    title: 'Cyberpunk: Neo Tokyo',
    description: 'In a rain-slicked neon metropolis of 2088, a rogue cybernetic detective uncovers a deep corporate conspiracy threatening to merge artificial intelligence with human consciousness permanently.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '2h 12m',
    releaseYear: '2026',
    rating: 'TV-MA',
    matchPercentage: 98,
    genres: ['Sci-Fi', 'Action Thriller', 'Cyberpunk'],
    isOriginal: true,
    type: 'movie',
    cast: ['Kaelen Vance', 'Sora Tanaka', 'Elena Rostov'],
    creator: 'Marcus Villeneuve'
  },
  {
    id: 'cosmic-odyssey',
    title: 'Cosmic Odyssey',
    description: 'When an anomalous wormhole appears near Saturn, a team of elite astronauts embarks on a desperate, one-way voyage across galaxies to find humanity a secondary home.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '3 Seasons',
    releaseYear: '2025',
    rating: 'TV-14',
    matchPercentage: 95,
    genres: ['Sci-Fi', 'Space Drama', 'Adventure'],
    isOriginal: true,
    type: 'series',
    cast: ['David Tennant', 'Zoe Saldana', 'Sterling K. Brown'],
    creator: 'Christopher Nolan',
    episodes: [
      { id: 'co-e1', title: 'The Event Horizon', description: 'The crew leaves Earth behind as the gravitational pull of Saturn reveals the gate.', duration: '48m', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', number: 1 },
      { id: 'co-e2', title: 'Dark Matter', description: 'An unexpected technical glitch traps the ship inside a pocket of dark nebula fields.', duration: '52m', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80', number: 2 },
      { id: 'co-e3', title: 'The Echo Chamber', description: 'The ship picks up ancient, eerie audio signals transmitting from an unmapped dead star.', duration: '45m', thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', number: 3 },
      { id: 'co-e4', title: 'Singularity', description: 'Time begins to dilate erratically as the crew makes a high-stakes escape attempt.', duration: '58m', thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=400&q=80', number: 4 }
    ]
  },
  {
    id: 'shadow-ninja',
    title: 'Shadow of the Shogun',
    description: 'In feudal Japan, a disgraced assassin betrays her shadowy clan to defend an innocent village, unleashing an exquisite storm of martial arts masterclass and honor.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '1h 56m',
    releaseYear: '2026',
    rating: 'TV-MA',
    matchPercentage: 99,
    genres: ['Action', 'Martial Arts', 'Historical Drama'],
    isOriginal: false,
    type: 'movie',
    cast: ['Hiroyuki Sanada', 'Rinko Kikuchi', 'Tadanobu Asano'],
    creator: 'Akira Kurosawa Jr.'
  },
  {
    id: 'stranger-woods',
    title: 'Stranger Woods',
    description: 'When a collection of teenagers search for their missing friend in the Pacific Northwest, they uncover a hidden government lab experimenting with temporal anomalies.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '4 Seasons',
    releaseYear: '2024',
    rating: 'TV-14',
    matchPercentage: 92,
    genres: ['Mystery', 'Sci-Fi Suspense', 'Nostalgia'],
    isOriginal: true,
    type: 'series',
    cast: ['Millie Bobby Evans', 'Finn Wolfpack', 'Winona Ryder'],
    creator: 'The Duffer Brothers',
    episodes: [
      { id: 'sw-e1', title: 'Chapter 1: The Midnight Mist', description: 'Will vanishes near the old forestry tower under abnormal weather conditions.', duration: '50m', thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80', number: 1 },
      { id: 'sw-e2', title: 'Chapter 2: Static on the Radio', description: 'The gang discovers a cryptic young girl with a shaved head wandering by the railway track.', duration: '46m', thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80', number: 2 },
      { id: 'sw-e3', title: 'Chapter 3: The Upside Cabin', description: 'Chief Hopper searches the deep reservation forest and discovers a strange organic ooze.', duration: '54m', thumbnail: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=80', number: 3 }
    ]
  },
  {
    id: 'formula-speed',
    title: 'Apex: Speed to Survive',
    description: 'Step into the high-octane cockpits of the fastest machines on Earth. Experience the drama, rivalries, and split-second decisions that define Formula racing elite.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration: '2 Seasons',
    releaseYear: '2025',
    rating: 'TV-MA',
    matchPercentage: 97,
    genres: ['Docuseries', 'Sports', 'High-Octane Adrenaline'],
    isOriginal: true,
    type: 'series',
    cast: ['Lewis Hamilton', 'Max Verstappen', 'Charles Leclerc'],
    creator: 'James Gay-Rees',
    episodes: [
      { id: 'fs-e1', title: 'Red Lights Out', description: 'Pre-season testing in Bahrain yields extreme shockwaves for the reigning world champions.', duration: '41m', thumbnail: 'https://images.unsplash.com/photo-1562591188-5284064ac236?auto=format&fit=crop&w=400&q=80', number: 1 },
      { id: 'fs-e2', title: 'Monaco Gridlock', description: 'Rain falls hard over Monte Carlo as a legendary qualifying battle unfolds.', duration: '44m', thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=80', number: 2 }
    ]
  },
  {
    id: 'chef-table',
    title: 'The Master’s Table',
    description: 'Embark on a sensory culinary journey inside the minds and kitchens of six of the world’s most revolutionary chefs transforming cultural cuisine today.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '1h 45m',
    releaseYear: '2025',
    rating: 'TV-PG',
    matchPercentage: 91,
    genres: ['Documentary', 'Food & Travel', 'Inspiring'],
    isOriginal: false,
    type: 'movie',
    cast: ['Massimo Bottura', 'Dominique Crenn', 'Jeong Kwan'],
    creator: 'David Gelb'
  },
  {
    id: 'heist-royal',
    title: 'La Casa De Oro (The Golden Heist)',
    description: 'Eight elite thieves lock themselves inside the Royal Mint of Spain with 60 hostages, while a mysterious criminal mastermind pulls the strings from the shadows.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '5 Seasons',
    releaseYear: '2024',
    rating: 'TV-MA',
    matchPercentage: 96,
    genres: ['Thriller', 'Crime Drama', 'Suspenseful'],
    isOriginal: true,
    type: 'series',
    cast: ['Alvaro Morte', 'Ursula Corbero', 'Pedro Alonso'],
    creator: 'Alex Pina',
    episodes: [
      { id: 'lh-e1', title: 'Efecto Mariposa', description: 'The Professor recruits a unique code-named crew at an isolated villa.', duration: '49m', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80', number: 1 },
      { id: 'lh-e2', title: 'Improvisation Protocol', description: 'Hostage disputes require Nairobi to step up while Berlin handles internal conflict.', duration: '51m', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80', number: 2 }
    ]
  },
  {
    id: 'ocean-blue',
    title: 'Our Majestic Blue Planet',
    description: 'Explore the mesmerizing depths of Earth’s vast oceans, highlighting the exotic sea creatures and secret underwater kingdoms never filmed before.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '1h 32m',
    releaseYear: '2026',
    rating: 'G',
    matchPercentage: 94,
    genres: ['Nature Documentary', 'Science & Nature', 'Family Viewing'],
    isOriginal: false,
    type: 'movie',
    cast: ['David Attenborough'],
    creator: 'Alastair Fothergill'
  },
  {
    id: 'neon-comedy',
    title: 'Laugh Out Loud: Tokyo',
    description: 'Four stand-up comedians from completely different walks of life navigate the intense, hilarious cultural nightlife of modern Tokyo in search of the perfect routine.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '1h 24m',
    releaseYear: '2025',
    rating: 'TV-MA',
    matchPercentage: 89,
    genres: ['Stand-Up Comedy', 'Feel-Good', 'Witty'],
    isOriginal: true,
    type: 'movie',
    cast: ['Kenji Sato', 'Amy Schumer', 'Ronny Chieng'],
    creator: 'Hitoshi Matsumoto'
  }
];

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
<<<<<<< HEAD
  preferredGenres: string[];
}

export const SUGGESTED_GENRES = [
  'Sci-Fi',
  'Action Thriller',
  'Cyberpunk',
  'Space Drama',
  'Adventure',
  'Action',
  'Martial Arts',
  'Historical Drama',
  'Mystery',
  'Sci-Fi Suspense',
  'Docuseries',
  'Sports',
  'Documentary',
  'Food & Travel',
  'Thriller',
  'Crime Drama',
  'Nature Documentary',
  'Stand-Up Comedy'
=======
}

export const PROFILES: Profile[] = [
  { id: 'p1', name: 'Alex', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'p2', name: 'Sarah', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'p3', name: 'Kids', avatarUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'p4', name: 'Guest', avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80' }
>>>>>>> da19bac9cad22ff1e0c11483c21a83dc60156faf
];

export const CATEGORIES = [
  { id: 'originals', title: 'Likfix Originals', filter: (m: Movie) => m.isOriginal === true },
  { id: 'trending', title: 'Trending Now', filter: (m: Movie) => m.matchPercentage >= 95 },
  { id: 'movies', title: 'Blockbuster Movies', filter: (m: Movie) => m.type === 'movie' },
  { id: 'series', title: 'Binge-Worthy TV Shows', filter: (m: Movie) => m.type === 'series' },
  { id: 'scifi', title: 'Sci-Fi & Action Masterpieces', filter: (m: Movie) => m.genres.includes('Sci-Fi') || m.genres.includes('Action') }
];
