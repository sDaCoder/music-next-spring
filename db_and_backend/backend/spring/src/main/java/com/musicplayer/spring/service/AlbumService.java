package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.AlbumRequest;
import com.musicplayer.spring.model.Album;
import com.musicplayer.spring.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    public List<Album> getAllAlbums() { return albumRepository.findAll(); }
    public Optional<Album> getAlbumById(UUID id) { return albumRepository.findById(id); }

    public Album createAlbum(AlbumRequest request) {
        Album album = new Album();
        album.setTitle(request.getTitle());
        album.setReleaseDate(request.getReleaseDate());
        album.setCoverArtUrl(request.getCoverArtUrl());
        album.setArtistId(request.getArtistId());
        return albumRepository.save(album);
    }

    public Optional<Album> updateAlbum(UUID id, AlbumRequest request) {
        if (albumRepository.findById(id).isPresent()) {
            Album album = new Album();
            album.setTitle(request.getTitle());
            album.setReleaseDate(request.getReleaseDate());
            album.setCoverArtUrl(request.getCoverArtUrl());
            album.setArtistId(request.getArtistId());
            albumRepository.update(id, album);
            album.setAlbumId(id);
            return Optional.of(album);
        }
        return Optional.empty();
    }

    public boolean deleteAlbum(UUID id) {
        return albumRepository.deleteById(id) > 0;
    }
}