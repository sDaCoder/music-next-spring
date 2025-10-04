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
    ORDER BY lh.listened_at DESC
    """;


        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Song.class));
    }



//    public ListeningHistory add(ListeningHistory listeningHistory) {
//        // Step 1: Delete any existing history for this song
//        String deleteSQL = "DELETE FROM listening_history WHERE song_id = ?";
//        jdbcTemplate.update(deleteSQL, listeningHistory.getSongId());
//
//        // Step 2: Insert new listening history entry
//        String insertSQL = "INSERT INTO listening_history (song_id, listened_at) VALUES (?, ?)";
//
//        KeyHolder keyHolder = new GeneratedKeyHolder();
//
//        jdbcTemplate.update(connection -> {
//            PreparedStatement ps = connection.prepareStatement(insertSQL, Statement.RETURN_GENERATED_KEYS);
//            ps.setObject(1, listeningHistory.getSongId());
//            ps.setTimestamp(2, Timestamp.valueOf(listeningHistory.getListenedAt()));
//            return ps;
//        }, keyHolder);
//
//        // Step 3: Set the generated ID (if present)
//        if (keyHolder.getKeys() != null && keyHolder.getKeys().get("id") != null) {
//            Number id = (Number) keyHolder.getKeys().get("id");
//            listeningHistory.setId(id.longValue());
//        }
//
//        return listeningHistory;
//    }

    public ListeningHistory add(ListeningHistory listeningHistory) {
        // Check if the song already exists in listening history
        String checkSql = "SELECT count FROM listening_history WHERE song_id = ?";
        List<Integer> counts = jdbcTemplate.query(
                checkSql,
                new Object[]{listeningHistory.getSongId()},
                (rs, rowNum) -> rs.getInt("count")
        );

        if (!counts.isEmpty()) {
            // Song exists → update count and timestamp
            String updateSql = """
            UPDATE listening_history
            SET count = count + 1, listened_at = ?
            WHERE song_id = ?
        """;
            jdbcTemplate.update(updateSql,
                    Timestamp.valueOf(listeningHistory.getListenedAt()),
                    listeningHistory.getSongId()
            );
        } else {
            // Song not found → insert new entry with count = 1
            String insertSQL = """
            INSERT INTO listening_history (song_id, listened_at, count)
            VALUES (?, ?, 1)
        """;
            jdbcTemplate.update(insertSQL,
                    listeningHistory.getSongId(),
                    Timestamp.valueOf(listeningHistory.getListenedAt())
            );
        }

        return listeningHistory; // optional: query and return full updated row
    }



}

