package com.example.MelodySchool.controllers;

import com.example.MelodySchool.exception.AlreadyExistException;
import com.example.MelodySchool.models.request.CreateUserRequest;
import com.example.MelodySchool.models.request.LoginRequest;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.repository.UserRepository;
import com.example.MelodySchool.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authResponseResponse(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<SimpleResponse> registerStudent(@RequestBody CreateUserRequest createUserRequest){
       if(userRepository.existsByUsername(createUserRequest.getUsername())){
           throw new AlreadyExistException("Пользователь с таким логином уже существует" + createUserRequest.getUsername() + createUserRequest.getRoles() + createUserRequest.getPassword() + createUserRequest.getEmail());
       }

       if(userRepository.existsByEmail(createUserRequest.getEmail())){
           throw new AlreadyExistException("Пользователь с таким e-mail уже существует!");
       }
        authService.registerUser(createUserRequest);

        return ResponseEntity.ok(new SimpleResponse("register ok"));
    }
}
