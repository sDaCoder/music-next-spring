package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ArtistRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Artist> findAll() {
        return jdbcTemplate.query("SELECT * FROM artists", new BeanPropertyRowMapper<>(Artist.class));
    }

    public Optional<Artist> findById(UUID id) {
        try {
            Artist artist = jdbcTemplate.queryForObject("SELECT * FROM artists WHERE artist_id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(Artist.class));
            return Optional.ofNullable(artist);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Artist save(Artist artist) {
        artist.setArtistId(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO artists (artist_id, name) VALUES (?, ?)",
                artist.getArtistId(), artist.getName());
        return artist;
    }

    public int update(UUID id, Artist artist) {
        return jdbcTemplate.update("UPDATE artists SET name = ? WHERE artist_id = ?",
                artist.getName(), id);
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM artists WHERE artist_id = ?", id);
    }
}
