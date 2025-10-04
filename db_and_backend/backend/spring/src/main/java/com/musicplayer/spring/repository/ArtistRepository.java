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

    public List<Artist> findByGenreId(UUID genreId) {
        String sql = "SELECT DISTINCT ar.* FROM artists ar " +
                "JOIN songs s ON ar.artist_id = s.artist_id " +
                "JOIN song_genres sg ON s.song_id = sg.song_id " +
                "WHERE sg.genre_id = ?";
        return jdbcTemplate.query(sql, new Object[]{genreId}, new BeanPropertyRowMapper<>(Artist.class));
    }
    public Artist save(Artist artist) {
        String sql = "INSERT INTO artists (name, image_url, bio) VALUES (?, ?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{artist.getName(), artist.getImageUrl(), artist.getBio()},
                new BeanPropertyRowMapper<>(Artist.class)
        );
    }

    // UPDATE the update method
    public int update(UUID id, Artist artist) {
        return jdbcTemplate.update("UPDATE artists SET name = ?, image_url = ?, bio = ? WHERE artist_id = ?",
                artist.getName(), artist.getImageUrl(), artist.getBio(), id);
    }
    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM artists WHERE artist_id = ?", id);
    }
}
