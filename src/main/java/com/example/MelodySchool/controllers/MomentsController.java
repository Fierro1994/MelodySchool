package com.example.MelodySchool.controllers;

import com.example.MelodySchool.models.request.AddMomentsRequest;
import com.example.MelodySchool.service.MomentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/app/profile/")
@RequiredArgsConstructor
public class MomentsController {
    private final MomentsService momentsService;

    @PostMapping("/addMoments")
    public ResponseEntity<?> addMoments(@RequestBody AddMomentsRequest request) throws SQLException {
        return ResponseEntity.ok(momentsService.addStories(request.getUserId(), request.getPath(), request.getArticle()));
    }
}
