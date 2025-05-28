# Music Playlist Backend API

A FastAPI-based REST API for managing music playlists and songs.

## Features

- Create, read, update, and delete playlists
- Add and remove songs from playlists
- Paginated song listings
- CORS support for frontend integration
- SQLite database with SQLAlchemy ORM

## Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server

## Setup and Installation

### 🐳 Docker Setup (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Quick Start with Docker
```bash
# From project root directory
docker-compose up -d backend
```

The API will be available at `http://localhost:8000`

#### Development with Docker
```bash
# Run with auto-reload
docker-compose -f docker-compose.dev.yml up backend
```

### Manual Setup

#### Prerequisites
- Python 3.8+
- pip

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

## API Endpoints

### Playlists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/playlists` | Get all playlists |
| GET | `/playlists/{playlist_id}` | Get playlist by ID |
| POST | `/playlists` | Create new playlist |
| PUT | `/playlists/{playlist_id}` | Update playlist |
| DELETE | `/playlists/{playlist_id}` | Delete playlist |

### Songs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/songs` | Get all songs (paginated) |
| GET | `/songs/{playlist_id}` | Get songs in playlist (paginated) |
| POST | `/songs/{playlist_id}` | Add song to playlist |
| DELETE | `/songs/{playlist_id}/{song_id}` | Remove song from playlist |

### Query Parameters

- `limit` (int): Number of items per page (default: 10)
- `skip` (int): Number of items to skip (default: 0)

## Project Structure

```
backend/
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration and session
├── models.py           # SQLAlchemy models
├── schemas.py          # Pydantic schemas
├── crud.py             # Database operations
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Database Models

### Playlist
- `id`: Primary key
- `name`: Playlist name
- `description`: Optional description
- `cover_image`: Optional cover image URL
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Song
- `id`: Primary key
- `title`: Song title
- `artist`: Artist name
- `album`: Album name (optional)
- `album_img`: Album image URL (optional)
- `duration`: Song duration (optional)
- `playlist_id`: Foreign key to playlist
- `added_at`: Timestamp when added to playlist

## Development

### Adding New Dependencies

1. Add the package to `requirements.txt`
2. Install with `pip install -r requirements.txt`

### Database Migrations

The database is automatically created when the application starts. For schema changes, you may need to delete `music_playlists.db` and restart the application.

## CORS Configuration

The API is configured to accept requests from `http://localhost:5173` (Vite development server). To change this, modify the `origins` list in `main.py`.

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `404`: Not found
- `422`: Validation error
- `500`: Internal server error

## Sample Usage

### Create a Playlist
```bash
curl -X POST "http://localhost:8000/playlists" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Playlist", "description": "My favorite songs"}'
```

### Add a Song to Playlist
```bash
curl -X POST "http://localhost:8000/songs/1" \
  -H "Content-Type: application/json" \
  -d '{"title": "Song Title", "artist": "Artist Name", "album": "Album Name"}'
```

### Get Songs with Pagination
```bash
curl "http://localhost:8000/songs?limit=20&skip=0"
```

## 🐳 Docker Commands

```bash
# Build backend image
docker build -t music-playlist-backend .

# Run backend container
docker run -p 8000:8000 -v $(pwd)/data:/app/data music-playlist-backend

# View logs
docker logs music-playlist-backend
```

## Environment Variables

```env
DATABASE_URL=sqlite:///./data/music_playlists.db
```
