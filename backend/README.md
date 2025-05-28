# Music Playlist App Backend

This is a FastAPI backend for the Music Playlist application.

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000.
API documentation can be found at http://localhost:8000/docs.

## API Endpoints

### Playlists

- `GET /playlists` - Get all playlists
- `GET /playlists/{playlist_id}` - Get a specific playlist with its songs
- `POST /playlists` - Create a new playlist
- `PUT /playlists/{playlist_id}` - Update a playlist
- `DELETE /playlists/{playlist_id}` - Delete a playlist

### Songs

- `GET /songs` - Get all songs with pagination support (limit and offset)
- `GET /songs/{playlist_id}` - Get all songs in a playlist
- `POST /songs/{playlist_id}` - Add a song to a playlist
- `DELETE /songs/{song_id}` - Remove a song from a playlist
