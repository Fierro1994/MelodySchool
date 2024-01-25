package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.User;
import com.example.MelodySchool.models.request.LastTimeOnline;
import com.example.MelodySchool.models.response.LastTimeOnlineRes;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public ResponseEntity<?> setlasttimeonline(Long userId) {
        User user = userRepository.findById(userId).get();
        user.setLastTimeOnline(LocalDateTime.now());
        userRepository.save(user);
        return  ResponseEntity.ok(new SimpleResponse(LocalDateTime.now().toString()));
    }

    public ResponseEntity<?> getlasttimeonline(Long userId) {

       LocalDateTime time =  userRepository.findById(userId).get().getLastTimeOnline();
        return ResponseEntity.ok(new LastTimeOnlineRes(time));

    }
}
