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
        album.setAlbumId(UUID.randomUUID());
        String sql = "INSERT INTO albums (album_id, title, release_date, cover_art_url, artist_id) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, album.getAlbumId(), album.getTitle(), album.getReleaseDate(), album.getCoverArtUrl(), album.getArtistId());
        return album;
    }

    public int update(UUID id, Album album) {
        String sql = "UPDATE albums SET title = ?, release_date = ?, cover_art_url = ?, artist_id = ? WHERE album_id = ?";
        return jdbcTemplate.update(sql, album.getTitle(), album.getReleaseDate(), album.getCoverArtUrl(), album.getArtistId(), id);
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM albums WHERE album_id = ?", id);
    }
}
