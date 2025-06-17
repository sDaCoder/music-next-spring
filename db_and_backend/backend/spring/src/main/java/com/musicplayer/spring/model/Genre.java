package com.musicplayer.spring.model;

import lombok.Data;
import java.util.UUID;
import java.time.OffsetDateTime;

@Data
public class Genre {
    private UUID genreId;
    private String name;
    private OffsetDateTime createdAt;
}
