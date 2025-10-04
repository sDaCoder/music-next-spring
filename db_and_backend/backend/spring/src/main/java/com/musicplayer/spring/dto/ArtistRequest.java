package com.musicplayer.spring.dto;

import lombok.Data;

@Data
public class ArtistRequest {
    private String name;
    private String imageUrl;
    private String bio;
}