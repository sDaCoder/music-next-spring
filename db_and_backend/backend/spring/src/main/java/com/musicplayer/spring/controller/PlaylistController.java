package com.musicplayer.spring.controller;

import com.musicplayer.spring.dto.PlaylistRequest;
import com.musicplayer.spring.dto.SongOrderRequest;
import com.musicplayer.spring.model.Playlist;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "*")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @GetMapping
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable UUID id) {
        return playlistService.getPlaylistById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{playlistId}/songs")
    public ResponseEntity<List<Song>> getSongsFromPlaylist(@PathVariable UUID playlistId) {
        List<Song> songs = playlistService.getSongsFromPlaylist(playlistId);
        return ResponseEntity.ok(songs);
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody PlaylistRequest request) {
        return new ResponseEntity<>(playlistService.createPlaylist(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable UUID id, @RequestBody PlaylistRequest request) {
        return playlistService.updatePlaylist(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable UUID id) {
        return playlistService.deletePlaylist(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> addSongToPlaylist(@PathVariable UUID playlistId, @PathVariable UUID songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> removeSongFromPlaylist(@PathVariable UUID playlistId, @PathVariable UUID songId) {
        playlistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{playlistId}/songs/order")
    public ResponseEntity<Void> updateSongOrder(@PathVariable UUID playlistId, @RequestBody List<SongOrderRequest> songOrderRequests) {
        playlistService.updateSongOrder(playlistId, songOrderRequests);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{playlistId}/albums/{albumId}")
    public ResponseEntity<Void> addAlbumToPlaylist(@PathVariable UUID playlistId, @PathVariable UUID albumId) {
        playlistService.addAlbumToPlaylist(playlistId, albumId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{playlistId}/songs/{songId}/move")
    public ResponseEntity<Void> moveSong(@PathVariable UUID playlistId, @PathVariable UUID songId, @RequestParam int newPosition) {
        playlistService.moveSongInPlaylist(playlistId, songId, newPosition);
        return ResponseEntity.ok().build();
    }
}
