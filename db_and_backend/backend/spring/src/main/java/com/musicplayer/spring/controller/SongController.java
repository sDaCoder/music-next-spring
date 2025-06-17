package com.musicplayer.spring.controller;

import com.musicplayer.spring.dto.SongRequest;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "*")
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping
    public List<Song> getAllSongs() { return songService.getAllSongs(); }
    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable UUID id) { return songService.getSongById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
    @GetMapping("/search")
    public List<Song> searchSongs(@RequestParam String title) { return songService.searchSongsByTitle(title); }

    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody SongRequest request) {
        return new ResponseEntity<>(songService.createSong(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(@PathVariable UUID id, @RequestBody SongRequest request) {
        return songService.updateSong(id, request).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable UUID id) {
        return songService.deleteSong(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}