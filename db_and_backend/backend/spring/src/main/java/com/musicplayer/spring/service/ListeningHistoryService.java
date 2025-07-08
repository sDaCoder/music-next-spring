package com.musicplayer.spring.service;

import com.musicplayer.spring.dto.ListeningHistoryRequest;
import com.musicplayer.spring.model.ListeningHistory;
import com.musicplayer.spring.model.Song;
import com.musicplayer.spring.repository.ListeningHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
public class ListeningHistoryService {
    @Autowired
    private ListeningHistoryRepository listeningHistoryRepository;

    public List<Song> getallsongs(){
        return listeningHistoryRepository.findAllSongsFromListeningHistory();
    }

//    public List<Song> getsongbyid(UUID id){
//        return listeningHistoryRepository.findById(id);
//    }

    public ListeningHistory addListeningHistory(@RequestBody ListeningHistoryRequest request){
        ListeningHistory listeningHistory = new ListeningHistory();
        listeningHistory.setSongId(request.getSongId());
        listeningHistory.setListenedAt(request.getListenedAt());

        return listeningHistoryRepository.add(listeningHistory);
    }

}
