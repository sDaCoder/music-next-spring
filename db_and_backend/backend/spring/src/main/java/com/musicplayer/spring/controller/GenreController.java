package com.musicplayer.spring.controller;

import com.musicplayer.spring.dto.GenreRequest;
import com.musicplayer.spring.model.Album;
import com.musicplayer.spring.model.Artist;
import com.musicplayer.spring.model.Genre;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.AlbumService;
import com.musicplayer.spring.service.ArtistService;
import com.musicplayer.spring.service.GenreService;
import com.musicplayer.spring.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/genres")
@CrossOrigin(origins = "*")
public class GenreController {
    @Autowired
    private GenreService genreService;
    @Autowired
    private AlbumService albumService;
    @Autowired
    private ArtistService artistService;
    @Autowired
    private SongService songService;

    @GetMapping
    public List<Genre> getAllGenres() { return genreService.getAllGenres(); }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable UUID id) {
        return genreService.getGenreById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{genreId}/songs")
    public List<Song> getSongsByGenre(@PathVariable UUID genreId) {
        return songService.getSongsByGenreId(genreId);
    }

    @GetMapping("/{genreId}/albums")
    public List<Album> getAlbumsByGenre(@PathVariable UUID genreId) {
        return albumService.getAlbumsByGenreId(genreId);
    }

    @GetMapping("/{genreId}/artists")
    public List<Artist> getArtistsByGenre(@PathVariable UUID genreId) {
        return artistService.getArtistsByGenreId(genreId);
    }

    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody GenreRequest request) {
        return new ResponseEntity<>(genreService.createGenre(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable UUID id, @RequestBody GenreRequest request) {
        return genreService.updateGenre(id, request).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable UUID id) {
        return genreService.deleteGenre(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
