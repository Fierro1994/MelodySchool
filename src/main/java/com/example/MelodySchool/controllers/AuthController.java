package com.example.MelodySchool.controllers;

import com.example.MelodySchool.exception.AlreadyExistException;
import com.example.MelodySchool.models.AuthResponse;
import com.example.MelodySchool.models.CreateUserRequest;
import com.example.MelodySchool.models.LoginRequest;
import com.example.MelodySchool.models.SimpleResponse;
import com.example.MelodySchool.repository.StudentRepository;
import com.example.MelodySchool.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final StudentRepository studentRepository;
    private final SecurityService securityService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> authResponseResponse(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(securityService.authResponseStudent(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStudent(@RequestBody CreateUserRequest createUserRequest){
       if(studentRepository.existsByUsername(createUserRequest.getUsername())){
           throw new AlreadyExistException("Пользователь с таким логином уже существует" + createUserRequest.getUsername() + createUserRequest.getRoles() + createUserRequest.getPassword() + createUserRequest.getEmail());
       }

       if(studentRepository.existsByEmail(createUserRequest.getEmail())){
           throw new AlreadyExistException("Пользователь с таким e-mail уже существует!");
       }
        securityService.register(createUserRequest);

        return ResponseEntity.ok(securityService.createUserResponse(createUserRequest));

    }
}
