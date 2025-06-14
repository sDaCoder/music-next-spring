package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SongRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Song> songRowMapper = (rs, rowNum) -> new Song(
            rs.getObject("song_id", UUID.class),
            rs.getString("title"),
            rs.getInt("duration_seconds"),
            rs.getString("file_url"),
            rs.getObject("artist_id", UUID.class),
            rs.getObject("album_id", UUID.class)
    );


    public List<Song> findAll() {
        String sql = "SELECT * FROM songs";
        return jdbcTemplate.query(sql, songRowMapper);
    }

    public Optional<Song> findById(UUID id) {
        String sql = "SELECT * FROM songs WHERE song_id = ?";
        try {
            Song song = jdbcTemplate.queryForObject(sql, new Object[]{id}, songRowMapper);
            return Optional.ofNullable(song);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Song> searchByTitle(String titleTerm) {
        // The '%' are wildcards. '%term%' means the term can appear anywhere in the title.
        String sql = "SELECT * FROM songs WHERE title ILIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + titleTerm + "%"}, songRowMapper);
    }
}
