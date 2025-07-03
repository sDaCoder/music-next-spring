package com.musicplayer.spring.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListeningHistory {
    @Setter
    private Long id;
    @Setter
    private String username; // Or use User object if you have authentication
    @Setter
    private Long songId;
    @Setter
    private LocalDateTime listenedAt;

    @ManyToOne
    @JoinColumn(name = "song_id", insertable = false, updatable = false)
    private Song song;

    // Getters, setters, constructors
    Long getListeningHistoryId(){
        return id;
    }

    void setListeningHistoryId(Long listeningHistoryId){
        this.id = listeningHistoryId;
    }

    String getUsername(){
        return username;
    }

}
