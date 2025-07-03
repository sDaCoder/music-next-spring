package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.ArtistRequest;
import com.musicplayer.spring.model.Artist;
import com.musicplayer.spring.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public List<Artist> getAllArtists() { return artistRepository.findAll(); }
    public Optional<Artist> getArtistById(UUID id) { return artistRepository.findById(id); }

    public Artist createArtist(ArtistRequest request) {
        Artist artist = new Artist();
        artist.setName(request.getName());
        return artistRepository.save(artist);
    }

    public Optional<Artist> updateArtist(UUID id, ArtistRequest request) {
        if (artistRepository.findById(id).isPresent()) {
            Artist artistToUpdate = new Artist();
            artistToUpdate.setName(request.getName());
            artistRepository.update(id, artistToUpdate);
            artistToUpdate.setArtistId(id);
            return Optional.of(artistToUpdate);
        }
        return Optional.empty();
    }

    public boolean deleteArtist(UUID id) {
        return artistRepository.deleteById(id) > 0;
    }
}
