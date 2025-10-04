package com.musicplayer.spring.controller;


import com.musicplayer.spring.dto.ListeningHistoryRequest;
import com.musicplayer.spring.model.ListeningHistory;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.service.ListeningHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")


public class ListeningHistoryController{
    @Autowired
    ListeningHistoryService listeningHistoryService;

    @GetMapping
    public List<Song> getListeningHistory(){
        return listeningHistoryService.getallsongs();
    }

    @PostMapping
    public ResponseEntity<ListeningHistory> addListeningHistory(@RequestBody ListeningHistoryRequest request){
        return new ResponseEntity<>(listeningHistoryService.addListeningHistory(request), HttpStatus.CREATED);
    }


}
