package com.musicplayer.spring.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class SongOrderRequest {
    private UUID songId;
    private int position;
}
