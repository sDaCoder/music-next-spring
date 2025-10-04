CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS artists (
  artist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
  name VARCHAR(255) NOT NULL,                          
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS albums (
  album_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),          
  title VARCHAR(255) NOT NULL,                                 
  release_date DATE NULL,                                      
  cover_art_url TEXT NULL,                                      
  artist_id UUID NOT NULL REFERENCES artists(artist_id) ON DELETE CASCADE, 
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS genres (
  genre_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),   
  name VARCHAR(100) UNIQUE NOT NULL,                      
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS songs (
  song_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),         
  title VARCHAR(255) NOT NULL,                                
  duration_seconds INTEGER NOT NULL,                          
  file_url TEXT NOT NULL,                                     
  artist_id UUID NOT NULL REFERENCES artists(artist_id) ON DELETE CASCADE, 
  album_id UUID NULL REFERENCES albums(album_id) ON DELETE SET NULL, 
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS song_genres (
  song_id UUID NOT NULL REFERENCES songs(song_id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES genres(genre_id) ON DELETE CASCADE,
  PRIMARY KEY (song_id, genre_id)
);

CREATE TABLE IF NOT EXISTS playlists (
    playlist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    playlist_icon_url TEXT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS playlist_songs (
    playlist_id UUID NOT NULL REFERENCES playlists(playlist_id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES songs(song_id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    position INTEGER NOT NULL, 
    PRIMARY KEY (playlist_id, song_id)
);

ALTER TABLE playlist_songs ADD CONSTRAINT unique_playlist_position UNIQUE (playlist_id, position);

ALTER TABLE playlist_songs DROP CONSTRAINT unique_playlist_position;

ALTER TABLE playlist_songs ADD CONSTRAINT unique_playlist_position UNIQUE (playlist_id, position) DEFERRABLE INITIALLY IMMEDIATE;

