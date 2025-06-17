package com.musicplayer.spring.model;

import lombok.Data;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class Album {
    private UUID albumId;
    private String title;
    private LocalDate releaseDate;
    private String coverArtUrl;
    private UUID artistId;
    private OffsetDateTime createdAt;
}
