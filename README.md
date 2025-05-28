# Music Playlist Application

A full-stack music playlist management application with a React frontend and FastAPI backend. Features a Spotify-inspired UI for creating, managing, and organizing music playlists.

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- Iconify for icons

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- SQLite database
- Pydantic for data validation

## 📁 Project Structure

```
music-playlist-app/
├── backend/                 # FastAPI backend
│   ├── main.py             # API entry point
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── crud.py             # Database operations
│   ├── database.py         # Database configuration
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend Docker configuration
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── package.json        # Node dependencies
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── Dockerfile.dev      # Development Docker configuration
│   └── nginx.conf          # Nginx configuration
├── docker-compose.yml      # Production Docker setup
├── docker-compose.dev.yml  # Development Docker setup
└── README.md              # This file
```

## 🐳 Docker Setup (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Production Deployment

1. Clone the repository:
```bash
git clone <repository-url>
cd music-playlist-app
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

### Development with Docker

1. Run development environment:
```bash
docker-compose -f docker-compose.dev.yml up
```

2. Access the application:
- Frontend: `http://localhost:5173` (with hot reload)
- Backend API: `http://localhost:8000` (with auto-reload)

### Docker Commands

```bash
# Build and start services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build frontend
docker-compose build backend
```

## 🚦 Manual Setup (Alternative)

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
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

Frontend will be available at `http://localhost:5173`

## 📖 API Documentation

Once the backend is running, visit:
- Interactive docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🎯 Key Endpoints

### Playlists
- `GET /playlists` - List all playlists
- `POST /playlists` - Create new playlist
- `PUT /playlists/{id}` - Update playlist
- `DELETE /playlists/{id}` - Delete playlist

### Songs
- `GET /songs` - List all songs (paginated)
- `POST /songs/{playlist_id}` - Add song to playlist
- `DELETE /songs/{playlist_id}/{song_id}` - Remove song


## 🔧 Development

### Docker Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Manual Development

Backend:
```bash
cd backend
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm run dev
```

## 🚀 Deployment

### Docker Production
```bash
# Build and deploy
docker-compose up -d --build

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

### Manual Deployment

#### Backend
- Deploy to services like Heroku, DigitalOcean, or AWS
- Update CORS origins for production frontend URL
- Use PostgreSQL for production database

#### Frontend
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API URL environment variable

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend
```env
DATABASE_URL=sqlite:///./data/music_playlists.db
```

## 📊 Data Persistence

- Database files are stored in `backend/data/` directory
- Docker volumes ensure data persists between container restarts
- For production, consider using PostgreSQL or MySQL

## 🐛 Troubleshooting

### Docker Issues
```bash
# Clean up containers and images
docker-compose down --volumes --rmi all

# Rebuild everything
docker-compose build --no-cache

# Check container logs
docker-compose logs backend
docker-compose logs frontend
```

### Port Conflicts
If ports 3000 or 8000 are in use, modify the docker-compose.yml file:
```yaml
ports:
  - "3001:80"  # Change frontend port
  - "8001:8000"  # Change backend port
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Thanawut Daorueng**

---

Built with React, FastAPI, and Docker
