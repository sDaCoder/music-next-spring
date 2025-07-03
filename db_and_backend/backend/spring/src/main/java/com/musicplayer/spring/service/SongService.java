package com.musicplayer.spring.service;

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

    public List<Song> searchSongsByTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            return List.of();
        }
        return songRepository.searchByTitle(title);
    }
}
