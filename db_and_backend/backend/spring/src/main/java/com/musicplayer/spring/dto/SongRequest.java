package com.musicplayer.spring.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class SongRequest {
    private String title;
    private int durationSeconds;
    private String fileUrl;
    private UUID artistId; // We need this to link the song
    private UUID albumId;  // We need this to link the song
}
