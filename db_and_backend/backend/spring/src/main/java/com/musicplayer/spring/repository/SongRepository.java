package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SongRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Song> findAll() {
        return jdbcTemplate.query("SELECT * FROM songs", new BeanPropertyRowMapper<>(Song.class));
    }

    public Optional<Song> findById(UUID id) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM songs WHERE song_id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(Song.class)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<Song> searchByTitle(String titleTerm) {
        return jdbcTemplate.query("SELECT * FROM songs WHERE title ILIKE ?", new Object[]{"%" + titleTerm + "%"}, new BeanPropertyRowMapper<>(Song.class));
    }

    public Song save(Song song) {
        String sql = "INSERT INTO songs (title, duration_seconds, file_url, artist_id, album_id) VALUES (?, ?, ?, ?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{
                        song.getTitle(),
                        song.getDurationSeconds(),
                        song.getFileUrl(),
                        song.getArtistId(),
                        song.getAlbumId()
                },
                new BeanPropertyRowMapper<>(Song.class)
        );
    }

    public int update(UUID id, Song song) {
        String sql = "UPDATE songs SET title = ?, duration_seconds = ?, file_url = ?, artist_id = ?, album_id = ? WHERE song_id = ?";
        return jdbcTemplate.update(
                sql,
                song.getTitle(),
                song.getDurationSeconds(),
                song.getFileUrl(),
                song.getArtistId(),
                song.getAlbumId(),
                id
        );
    }

    public List<Song> findByArtistId(UUID artistId) {
        String sql = "SELECT * FROM songs WHERE artist_id = ?";
        return jdbcTemplate.query(sql, new Object[]{artistId}, new BeanPropertyRowMapper<>(Song.class));
    }

    public List<Song> findByGenreId(UUID genreId) {
        String sql = "SELECT s.* FROM songs s " +
                "JOIN song_genres sg ON s.song_id = sg.song_id " +
                "WHERE sg.genre_id = ?";
        return jdbcTemplate.query(sql, new Object[]{genreId}, new BeanPropertyRowMapper<>(Song.class));
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM songs WHERE song_id = ?", id);
    }

    public List<Song> findByAlbumId(UUID albumId) {
        String sql = "SELECT * FROM songs WHERE album_id = ?";
        return jdbcTemplate.query(sql, new Object[]{albumId}, new BeanPropertyRowMapper<>(Song.class));
    }
}