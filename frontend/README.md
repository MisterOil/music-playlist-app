# Music Playlist Frontend

A modern React-based web application for managing music playlists with a Spotify-inspired UI.

## Features

- 🎵 Create, edit, and delete playlists
- 🔍 Real-time song search
- 📱 Responsive design
- 🎨 Dark theme with Spotify-inspired UI
- ⚡ Fast pagination for large song libraries
- 📋 Add/remove songs from playlists
- 🎯 TypeScript for type safety
- 🧩 Component-based architecture

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Iconify** - Icon library
- **React Context** - Toast notifications

## Setup and Installation

### 🐳 Docker Setup (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Quick Start with Docker
```bash
# From project root directory
docker-compose up -d frontend
```

The application will be available at `http://localhost:3000`

#### Development with Docker
```bash
# Run with hot reload
docker-compose -f docker-compose.dev.yml up frontend
```

Access at `http://localhost:5173`

### Manual Setup

#### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AllSongsList.tsx
│   │   ├── CreatePlaylistModal.tsx
│   │   ├── EditPlaylistModal.tsx
│   │   ├── DeletePlaylistModal.tsx
│   │   ├── NavBar.tsx
│   │   ├── PlaylistHeader.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SildBar.tsx
│   │   ├── SongsList.tsx
│   │   └── ToastContainer.tsx
│   ├── contexts/           # React contexts
│   │   └── ToastContext.tsx
│   ├── pages/              # Page components
│   │   └── MainPage.tsx
│   ├── providers/          # Context providers
│   │   └── ToastProvider.tsx
│   ├── services/           # API services
│   │   └── apiService.ts
│   ├── store/              # State management
│   │   └── playlistStore.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── playlistType.ts
│   │   └── storeType.ts
│   ├── utils/              # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Key Components

### State Management (Zustand)
- **playlistStore**: Manages playlists, songs, search state, and pagination
- Provides actions for CRUD operations on playlists and songs
- Handles API calls and error states

### Components

- **Sidebar**: Navigation and playlist management
- **NavBar**: Search bar and user profile
- **MainPage**: Main content area with conditional rendering
- **AllSongsList**: Paginated list of all available songs
- **SearchResults**: Filtered search results
- **PlaylistHeader**: Playlist details and actions
- **SongsList**: Songs within a specific playlist

### Services

- **apiService**: HTTP client for backend API communication
- Handles all API endpoints with proper error handling
- Type-safe request/response interfaces

## Features in Detail

### Playlist Management
- Create playlists with name and description
- Edit playlist details
- Delete playlists with confirmation
- View playlist with song count and metadata

### Song Management
- Browse all songs with pagination
- Add songs to playlists
- Remove songs from playlists
- Real-time search across title, artist, and album

### Search Functionality
- Real-time search as you type
- Searches across song title, artist, and album
- Displays results in table format
- No API calls - filters from loaded songs

### Pagination
- Configurable page sizes (5, 10, 20, 50)
- Navigate between pages
- Shows current page and total count
- Separate pagination for all songs and playlist songs

### Toast Notifications
- Success/error notifications
- Auto-dismiss after timeout
- Multiple notification types (success, error, info, warning)

## Environment Variables

### Docker Environment
```env
VITE_API_URL=/api
```

### Manual Development
```env
VITE_API_URL=http://localhost:8000
```

## Styling

The application uses Tailwind CSS with a custom dark theme:
- Primary colors: Black, gray variants
- Accent color: Green (Spotify-inspired)
- Responsive design for mobile and desktop
- Hover effects and smooth transitions

## Type Safety

Full TypeScript implementation with:
- Strict type checking
- Interface definitions for all data models
- Type-safe API calls
- Component prop validation

## Icons

Uses Iconify for scalable vector icons:
- Music-related icons throughout the app
- Consistent icon sizing and styling
- Easy to replace and customize

## Performance Optimizations

- Lazy loading of components
- Pagination to limit data fetching
- Debounced search (configurable)
- Memoized components where appropriate
- Efficient state updates with Zustand

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2015+ support required
- Mobile responsive design

## Development Tips

### Adding New Components
1. Create component in `src/components/`
2. Export from component file
3. Import and use in parent components
4. Add TypeScript interfaces as needed

### State Management
- Use Zustand store for global state
- Local state with useState for component-specific data
- Actions for all state mutations

### Styling
- Use Tailwind utility classes
- Follow existing color scheme
- Maintain responsive design patterns

## Building for Production

### Docker Build
```bash
docker build -t music-playlist-frontend .
```

### Manual Build
```bash
npm run build
```

This creates optimized files in the `dist` directory ready for deployment.

## Deployment

The built application can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Make sure to update the API URL for production environment.
