package com.musicplayer.spring.controller;

import com.musicplayer.spring.dto.AlbumRequest;
import com.musicplayer.spring.model.Album;
import com.musicplayer.spring.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "*")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @GetMapping
    public List<Album> getAllAlbums() { return albumService.getAllAlbums(); }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable UUID id) {
        return albumService.getAlbumById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Album> createAlbum(@RequestBody AlbumRequest request) {
        return new ResponseEntity<>(albumService.createAlbum(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable UUID id, @RequestBody AlbumRequest request) {
        return albumService.updateAlbum(id, request).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable UUID id) {
        return albumService.deleteAlbum(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}