package com.example.MelodySchool.service;


import com.example.MelodySchool.entity.Moments;
import com.example.MelodySchool.entity.User;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.repository.MomentsRepository;
import com.example.MelodySchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MomentsService {

    private final UserRepository userRepository;

    private final MomentsRepository momentsRepository;


    public ResponseEntity<?> addStories(Long userId, String path, String article) {
        User user = userRepository.findById(userId).get();
        List<Moments> momentsList = user.getStories();
        String hashName = UUID.randomUUID().toString();
        momentsList.add(new Moments(hashName, path, article, LocalDateTime.now()));
        user.setStories(momentsList);
        return  ResponseEntity.ok(new SimpleResponse("История добавлена"));
    }


}
