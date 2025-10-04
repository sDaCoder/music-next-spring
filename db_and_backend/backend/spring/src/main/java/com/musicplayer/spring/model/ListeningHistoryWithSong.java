package com.musicplayer.spring.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ListeningHistoryWithSong {
    private Long historyId;
    private LocalDateTime listenedAt;
    private Song song;

    public ListeningHistoryWithSong(Long historyId, LocalDateTime listenedAt, Song song) {
        this.historyId = historyId;
        this.listenedAt = listenedAt;
        this.song = song;
    }
}

