package com.musicplayer.spring.dto;

import lombok.Data;

@Data
public class PlaylistRequest {
    private String name;
    private String playlistIconUrl;
    private String description;
}