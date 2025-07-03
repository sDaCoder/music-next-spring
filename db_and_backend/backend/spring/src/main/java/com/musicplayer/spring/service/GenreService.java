package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.GenreRequest;
import com.musicplayer.spring.model.Genre;
import com.musicplayer.spring.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GenreService {
    @Autowired
    private GenreRepository genreRepository;

    public List<Genre> getAllGenres() { return genreRepository.findAll(); }

    public Optional<Genre> getGenreById(UUID id) { return genreRepository.findById(id); }

    public Genre createGenre(GenreRequest request) {
        Genre genre = new Genre();
        genre.setName(request.getName());
        return genreRepository.save(genre);
    }

    public Optional<Genre> updateGenre(UUID id, GenreRequest request) {
        if(genreRepository.findById(id).isPresent()) {
            Genre genre = new Genre();
            genre.setName(request.getName());
            genreRepository.update(id, genre);
            genre.setGenreId(id);
            return Optional.of(genre);
        }
        return Optional.empty();
    }

    public boolean deleteGenre(UUID id) {
        return genreRepository.deleteById(id) > 0;
    }
}
