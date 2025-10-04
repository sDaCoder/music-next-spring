package com.musicplayer.spring.repository;

import com.musicplayer.spring.model.Playlist;
import com.musicplayer.spring.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class PlaylistRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Playlist> findAll() {
        return jdbcTemplate.query("SELECT * FROM playlists", new BeanPropertyRowMapper<>(Playlist.class));
    }

    public Optional<Playlist> findById(UUID id) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM playlists WHERE playlist_id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(Playlist.class)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Playlist save(Playlist playlist) {
        String sql = "INSERT INTO playlists (name, playlist_icon_url, description) VALUES (?, ?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{
                        playlist.getName(),
                        playlist.getPlaylistIconUrl(),
                        playlist.getDescription()
                },
                new BeanPropertyRowMapper<>(Playlist.class)
        );
    }

    public int update(UUID id, Playlist playlist) {
        String sql = "UPDATE playlists SET name = ?, playlist_icon_url = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE playlist_id = ?";
        return jdbcTemplate.update(sql, playlist.getName(), playlist.getPlaylistIconUrl(),playlist.getDescription(), id);
    }

    public int deleteById(UUID id) {
        return jdbcTemplate.update("DELETE FROM playlists WHERE playlist_id = ?", id);
    }

    public void addSongToPlaylist(UUID playlistId, UUID songId, int position) {
        String sql = "INSERT INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, playlistId, songId, position);
    }

    public void removeSongFromPlaylist(UUID playlistId, UUID songId) {
        String sql = "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
        jdbcTemplate.update(sql, playlistId, songId);
    }


    public Optional<Integer> findPositionOfSong(UUID playlistId, UUID songId) {
        try {
            String sql = "SELECT position FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
            Integer position = jdbcTemplate.queryForObject(sql, new Object[]{playlistId, songId}, Integer.class);
            return Optional.ofNullable(position);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @SuppressWarnings("SqlResolve")
    public void setConstraintsDeferred() {
        jdbcTemplate.execute("SET CONSTRAINTS unique_playlist_position DEFERRED");
    }

    public void shiftPositions(UUID playlistId, int startPosition, int endPosition, int direction) {
        String sql = "UPDATE playlist_songs SET position = position + ? WHERE playlist_id = ? AND position BETWEEN ? AND ?";
        jdbcTemplate.update(sql, direction, playlistId, startPosition, endPosition);
    }


    public void updateSongPosition(UUID playlistId, UUID songId, int newPosition) {
        String sql = "UPDATE playlist_songs SET position = ? WHERE playlist_id = ? AND song_id = ?";
        jdbcTemplate.update(sql, newPosition, playlistId, songId);
    }


    public void shiftPositionsUpFrom(UUID playlistId, int deletedPosition) {
        String sql = "UPDATE playlist_songs SET position = position - 1 WHERE playlist_id = ? AND position > ?";
        jdbcTemplate.update(sql, playlistId, deletedPosition);
    }


    public int getMaxPosition(UUID playlistId) {
        String sql = "SELECT COALESCE(MAX(position), 0) FROM playlist_songs WHERE playlist_id = ?";
        Integer maxPosition = jdbcTemplate.queryForObject(sql, new Object[]{playlistId}, Integer.class);
        return (maxPosition != null) ? maxPosition : 0;
    }

    public List<Song> findSongsByPlaylistId(UUID playlistId) {
        String sql = "SELECT s.* FROM songs s " +
                "JOIN playlist_songs ps ON s.song_id = ps.song_id " +
                "WHERE ps.playlist_id = ? " +
                "ORDER BY ps.position";
        return jdbcTemplate.query(sql, new Object[]{playlistId}, new BeanPropertyRowMapper<>(Song.class));
    }

}