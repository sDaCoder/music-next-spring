package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.SongRequest;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Optional<Song> getSongById(UUID id) {
        return songRepository.findById(id);
    }

    public List<Song> getSongsByAlbumId(UUID albumId) {
        return songRepository.findByAlbumId(albumId);
    }

    public List<Song> getSongsByArtistId(UUID artistId) {
        return songRepository.findByArtistId(artistId);
    }

    public List<Song> getSongsByGenreId(UUID genreId) {
        return songRepository.findByGenreId(genreId);
    }

    public List<Song> searchSongsByTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            return List.of();
        }
        return songRepository.searchByTitle(title);
    }

    public Song createSong(SongRequest request) {
        Song song = new Song();
        song.setTitle(request.getTitle());
        song.setDurationSeconds(request.getDurationSeconds());
        song.setFileUrl(request.getFileUrl());
        song.setArtistId(request.getArtistId());
        song.setAlbumId(request.getAlbumId());
        return songRepository.save(song);
    }

    public Optional<Song> updateSong(UUID id, SongRequest request) {
        if (songRepository.findById(id).isPresent()) {
            Song songToUpdate = new Song();
            songToUpdate.setTitle(request.getTitle());
            songToUpdate.setDurationSeconds(request.getDurationSeconds());
            songToUpdate.setFileUrl(request.getFileUrl());
            songToUpdate.setArtistId(request.getArtistId());
            songToUpdate.setAlbumId(request.getAlbumId());

            songRepository.update(id, songToUpdate);
            songToUpdate.setSongId(id);
            return Optional.of(songToUpdate);
        }
        return Optional.empty();
    }

    public boolean deleteSong(UUID id) {
        return songRepository.deleteById(id) > 0;
    }
}
