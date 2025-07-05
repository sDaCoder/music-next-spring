package com.musicplayer.spring.model;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class Playlist {
    private UUID playlistId;
    private String name;
    private String playlistIconUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}