import uuid
from datetime import datetime
from typing import List
from ..models.song import Song

def generate_mock_songs() -> List[Song]:
    """Generate a list of mock songs for testing"""
    songs = [
        {
            "title": "Bohemian Rhapsody",
            "artist": "Queen",
            "album": "A Night at the Opera",
            "album_img": "https://picsum.photos/seed/queen/300/300",
            "duration": "5:55"
        },
        {
            "title": "Billie Jean",
            "artist": "Michael Jackson",
            "album": "Thriller",
            "album_img": "https://picsum.photos/seed/mj/300/300",
            "duration": "4:54"
        },
        {
            "title": "Imagine",
            "artist": "John Lennon",
            "album": "Imagine",
            "album_img": "https://picsum.photos/seed/lennon/300/300",
            "duration": "3:03"
        },
        {
            "title": "Smells Like Teen Spirit",
            "artist": "Nirvana",
            "album": "Nevermind",
            "album_img": "https://picsum.photos/seed/nirvana/300/300",
            "duration": "5:01"
        },
        {
            "title": "Hotel California",
            "artist": "Eagles",
            "album": "Hotel California",
            "album_img": "https://picsum.photos/seed/eagles/300/300",
            "duration": "6:30"
        },
        {
            "title": "Sweet Child o' Mine",
            "artist": "Guns N' Roses",
            "album": "Appetite for Destruction",
            "album_img": "https://picsum.photos/seed/gnr/300/300",
            "duration": "5:56"
        },
        {
            "title": "Like a Rolling Stone",
            "artist": "Bob Dylan",
            "album": "Highway 61 Revisited",
            "album_img": "https://picsum.photos/seed/dylan/300/300",
            "duration": "6:13"
        },
        {
            "title": "Stairway to Heaven",
            "artist": "Led Zeppelin",
            "album": "Led Zeppelin IV",
            "album_img": "https://picsum.photos/seed/ledzep/300/300",
            "duration": "8:02"
        },
        {
            "title": "Yesterday",
            "artist": "The Beatles",
            "album": "Help!",
            "album_img": "https://picsum.photos/seed/beatles/300/300",
            "duration": "2:05"
        },
        {
            "title": "Respect",
            "artist": "Aretha Franklin",
            "album": "I Never Loved a Man the Way I Love You",
            "album_img": "https://picsum.photos/seed/aretha/300/300",
            "duration": "2:28"
        },
        {
            "title": "Purple Haze",
            "artist": "Jimi Hendrix",
            "album": "Are You Experienced",
            "album_img": "https://picsum.photos/seed/hendrix/300/300",
            "duration": "2:50"
        },
        {
            "title": "What's Going On",
            "artist": "Marvin Gaye",
            "album": "What's Going On",
            "album_img": "https://picsum.photos/seed/gaye/300/300",
            "duration": "3:53"
        },
        {
            "title": "Hey Jude",
            "artist": "The Beatles",
            "album": "The Beatles (White Album)",
            "album_img": "https://picsum.photos/seed/jude/300/300",
            "duration": "7:11"
        },
        {
            "title": "Thriller",
            "artist": "Michael Jackson",
            "album": "Thriller",
            "album_img": "https://picsum.photos/seed/thriller/300/300",
            "duration": "5:57"
        },
        {
            "title": "London Calling",
            "artist": "The Clash",
            "album": "London Calling",
            "album_img": "https://picsum.photos/seed/clash/300/300",
            "duration": "3:19"
        }
    ]
    
    mock_songs = []
    for song_data in songs:
        song = Song(
            id=str(uuid.uuid4()),
            title=song_data["title"],
            artist=song_data["artist"],
            album=song_data["album"],
            album_img=song_data["album_img"],
            duration=song_data["duration"],
            playlist_id=None,
            added_at=datetime.now()
        )
        mock_songs.append(song)
    
    return mock_songs
