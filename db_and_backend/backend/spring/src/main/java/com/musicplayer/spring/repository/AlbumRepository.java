package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class AlbumRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Album> findAll() { return jdbcTemplate.query("SELECT * FROM albums", new BeanPropertyRowMapper<>(Album.class)); }

    public Optional<Album> findById(UUID id) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM albums WHERE album_id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(Album.class)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Album save(Album album) {
        String sql = "INSERT INTO albums (title, release_date, cover_art_url, description, artist_id) VALUES (?, ?, ?, ?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{
                        album.getTitle(),
                        album.getReleaseDate(),
                        album.getCoverArtUrl(),
                        album.getDescription(),
                        album.getArtistId()
                },
                new BeanPropertyRowMapper<>(Album.class)
        );
    }
    public int update(UUID id, Album album) {
        String sql = "UPDATE albums SET title = ?, release_date = ?, cover_art_url = ?, description = ?, artist_id = ? WHERE album_id = ?";
        return jdbcTemplate.update(sql, album.getTitle(), album.getReleaseDate(), album.getCoverArtUrl(),album.getDescription(), album.getArtistId(), id);
    }

    public List<Album> findByArtistId(UUID artistId) {
        String sql = "SELECT * FROM albums WHERE artist_id = ?";
        return jdbcTemplate.query(sql, new Object[]{artistId}, new BeanPropertyRowMapper<>(Album.class));
    }

    public List<Album> findByGenreId(UUID genreId) {
        String sql = "SELECT DISTINCT a.* FROM albums a " +
                "JOIN songs s ON a.album_id = s.album_id " +
                "JOIN song_genres sg ON s.song_id = sg.song_id " +
                "WHERE sg.genre_id = ?";
        return jdbcTemplate.query(sql, new Object[]{genreId}, new BeanPropertyRowMapper<>(Album.class));
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM albums WHERE album_id = ?", id);
    }
}
