package com.musicplayer.spring.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class AlbumRequest {
    private String title;
    private LocalDate releaseDate;
    private String coverArtUrl;
    private UUID artistId;
}