package com.musicplayer.spring.controller;

import com.musicplayer.spring.dto.ArtistRequest;
import com.musicplayer.spring.model.Album;
import com.musicplayer.spring.model.Artist;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.AlbumService;
import com.musicplayer.spring.service.ArtistService;
import com.musicplayer.spring.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin(origins = "*")
public class ArtistController {

    @Autowired
    private ArtistService artistService;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private SongService songService;

    @GetMapping
    public List<Artist> getAllArtists() { return artistService.getAllArtists(); }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable UUID id) {
        return artistService.getArtistById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{artistId}/albums")
    public List<Album> getAlbumsByArtist(@PathVariable UUID artistId) {
        return albumService.getAlbumsByArtistId(artistId);
    }

    @GetMapping("/{artistId}/songs")
    public List<Song> getSongsByArtist(@PathVariable UUID artistId) {
        return songService.getSongsByArtistId(artistId);
    }


    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody ArtistRequest request) {
        return new ResponseEntity<>(artistService.createArtist(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable UUID id, @RequestBody ArtistRequest request) {
        return artistService.updateArtist(id, request).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable UUID id) {
        return artistService.deleteArtist(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
