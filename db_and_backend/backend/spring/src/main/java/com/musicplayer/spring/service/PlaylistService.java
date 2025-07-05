package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.PlaylistRequest;
import com.musicplayer.spring.dto.SongOrderRequest;
import com.musicplayer.spring.model.Playlist;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.repository.PlaylistRepository;
import com.musicplayer.spring.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongRepository songRepository;

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Optional<Playlist> getPlaylistById(UUID id) {
        return playlistRepository.findById(id);
    }

    public Playlist createPlaylist(PlaylistRequest request) {
        Playlist playlist = new Playlist();
        playlist.setName(request.getName());
        playlist.setPlaylistIconUrl(request.getPlaylistIconUrl());
        return playlistRepository.save(playlist);
    }

    public Optional<Playlist> updatePlaylist(UUID id, PlaylistRequest request) {
        return playlistRepository.findById(id).map(playlist -> {
            playlist.setName(request.getName());
            playlist.setPlaylistIconUrl(request.getPlaylistIconUrl());
            playlistRepository.update(id, playlist);
            return playlist;
        });
    }

    public boolean deletePlaylist(UUID id) {
        return playlistRepository.deleteById(id) > 0;
    }

    public void addSongToPlaylist(UUID playlistId, UUID songId) {
        int position = playlistRepository.getMaxPosition(playlistId) + 1;
        playlistRepository.addSongToPlaylist(playlistId, songId, position);
    }


    @Transactional
    public void addAlbumToPlaylist(UUID playlistId, UUID albumId) {
        List<Song> songs = songRepository.findByAlbumId(albumId);
        int currentPosition = playlistRepository.getMaxPosition(playlistId) + 1;
        for (Song song : songs) {
            playlistRepository.addSongToPlaylist(playlistId, song.getSongId(), currentPosition++);
        }
    }

    @Transactional
    public void removeSongFromPlaylist(UUID playlistId, UUID songId) {
        int deletedPosition = playlistRepository.findPositionOfSong(playlistId, songId)
                .orElseThrow(() -> new IllegalStateException("Song not found in playlist"));

        playlistRepository.removeSongFromPlaylist(playlistId, songId);

        playlistRepository.shiftPositionsUpFrom(playlistId, deletedPosition);
    }


    // Replace the entire moveSongInPlaylist method in PlaylistService.java
    @Transactional
    public void moveSongInPlaylist(UUID playlistId, UUID songId, int newPosition) {
        int oldPosition = playlistRepository.findPositionOfSong(playlistId, songId)
                .orElseThrow(() -> new IllegalStateException("Song not found in playlist"));

        if (oldPosition == newPosition) {
            return; // No change needed
        }

        // Tell the database to wait until the transaction is over to check our unique constraint
        playlistRepository.setConstraintsDeferred(playlistId);

        if (newPosition < oldPosition) {
            // Moving UP the list (e.g., from 5 to 2).
            // Shift songs between the new and old positions DOWN (+1).
            playlistRepository.shiftPositions(playlistId, newPosition, oldPosition - 1, 1);
        } else {
            // Moving DOWN the list (e.g., from 2 to 5).
            // Shift songs between the old and new positions UP (-1).
            playlistRepository.shiftPositions(playlistId, oldPosition + 1, newPosition, -1);
        }

        // Finally, place the moved song into its new, now-empty spot.
        playlistRepository.updateSongPosition(playlistId, songId, newPosition);

        // The transaction commits here, and the database checks the constraint.
        // Since all positions are now unique again, the check passes.
    }

    public List<Song> getSongsFromPlaylist(UUID playlistId) {
        return playlistRepository.findSongsByPlaylistId(playlistId);
    }

    @Transactional
    public void updateSongOrder(UUID playlistId, List<SongOrderRequest> songOrderRequests) {
        for (SongOrderRequest request : songOrderRequests) {
            playlistRepository.updateSongPosition(playlistId, request.getSongId(), request.getPosition());
        }
    }
}