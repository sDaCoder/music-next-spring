package com.musicplayer.spring.controller;

import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController

@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000")

public class SongController {
    @Autowired
    private SongService songService;

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable UUID id) {
        Optional<Song> song = songService.getSongById(id);
        return song.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Song> searchSongs(@RequestParam String title) {
        return songService.searchSongsByTitle(title);
    }
}
