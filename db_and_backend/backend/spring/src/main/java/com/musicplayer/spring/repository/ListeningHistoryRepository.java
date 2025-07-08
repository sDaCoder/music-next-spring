package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.ListeningHistory;
import com.musicplayer.spring.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;

import java.util.List;
import java.util.UUID;

@Repository
public class ListeningHistoryRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ListeningHistoryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ✅ Get all songs from listening history
    public List<Song> findAllSongsFromListeningHistory() {
        String sql = """
            SELECT 
                s.song_id AS songId,
                s.title,
                s.duration_seconds AS durationSeconds,
                s.file_url AS fileUrl,
                s.artist_id AS artistId,
                s.album_id AS albumId
            FROM listening_history lh
            JOIN songs s ON lh.song_id = s.song_id
        """;

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Song.class));
    }

    // ✅ Add a new ListeningHistory row
    public ListeningHistory add(ListeningHistory listeningHistory) {
        String insertSQL = "INSERT INTO listening_history (song_id, listened_at) VALUES (?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(insertSQL, Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, listeningHistory.getSongId());
            ps.setTimestamp(2, Timestamp.valueOf(listeningHistory.getListenedAt()));
            return ps;
        }, keyHolder);

        // Use getKeys() instead of getKey() to avoid the error
        Number id = (Number) keyHolder.getKeys().get("id");
        if (id != null) {
            listeningHistory.setId(id.longValue());
        }

        return listeningHistory;
    }


}

