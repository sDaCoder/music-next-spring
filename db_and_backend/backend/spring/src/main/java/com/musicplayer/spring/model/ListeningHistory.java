package com.musicplayer.spring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ListeningHistory {

    private Long id;

    private UUID songId;

    private LocalDateTime listenedAt;
}
