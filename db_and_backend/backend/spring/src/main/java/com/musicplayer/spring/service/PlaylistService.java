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
        playlist.setDescription(request.getDescription());
        return playlistRepository.save(playlist);
    }

    public Optional<Playlist> updatePlaylist(UUID id, PlaylistRequest request) {
        return playlistRepository.findById(id).map(playlist -> {
            playlist.setName(request.getName());
            playlist.setPlaylistIconUrl(request.getPlaylistIconUrl());
            playlist.setDescription(request.getDescription());
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


    @Transactional
    public void moveSongInPlaylist(UUID playlistId, UUID songId, int newPosition) {
        int oldPosition = playlistRepository.findPositionOfSong(playlistId, songId)
                .orElseThrow(() -> new IllegalStateException("Song not found in playlist"));

        if (oldPosition == newPosition) {
            return;
        }

        playlistRepository.setConstraintsDeferred();

        if (newPosition < oldPosition) {
            playlistRepository.shiftPositions(playlistId, newPosition, oldPosition - 1, 1);
        } else {
            playlistRepository.shiftPositions(playlistId, oldPosition + 1, newPosition, -1);
        }

        playlistRepository.updateSongPosition(playlistId, songId, newPosition);
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