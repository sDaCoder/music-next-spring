package com.musicplayer.spring.service;

import com.musicplayer.spring.repository.ListeningHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListeningHistoryService {
    @Autowired
    private ListeningHistoryRepository listeningHistoryRepository;



}
