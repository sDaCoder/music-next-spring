package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class GenreRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Genre> findAll() { return jdbcTemplate.query("SELECT * FROM genres", new BeanPropertyRowMapper<>(Genre.class)); }

    public Optional<Genre> findById(UUID id) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM genres WHERE genre_id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(Genre.class)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Genre save(Genre genre) {
        genre.setGenreId(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO genres (genre_id, name) VALUES (?, ?)", genre.getGenreId(), genre.getName());
        return genre;
    }

    public int update(UUID id, Genre genre) {
        return jdbcTemplate.update("UPDATE genres SET name = ? WHERE genre_id = ?", genre.getName(), id);
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM genres WHERE genre_id = ?", id);
    }
}
