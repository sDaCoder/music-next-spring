package com.musicplayer.spring.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ListeningHistoryRequest {
    private UUID songId;
    private LocalDateTime ListenedAt;
}
