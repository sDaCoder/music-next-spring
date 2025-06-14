package com.musicplayer.spring.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Song {
    private UUID songId;
    private String title;
    private int durationSeconds;
    private String fileUrl;
    private UUID artistId;
    private UUID albumId;
}
