package com.example.MelodySchool.controllers;

import com.example.MelodySchool.exception.AlreadyExistException;
import com.example.MelodySchool.models.request.CreateUserRequest;
import com.example.MelodySchool.models.request.LoginRequest;
import com.example.MelodySchool.models.request.TokenRefreshRequest;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.models.response.TokenRefreshResponse;
import com.example.MelodySchool.repository.UserRepository;
import com.example.MelodySchool.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;




    @PostMapping("/signin")
    public ResponseEntity<?> authResponseResponse(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest, response));
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
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(authService.refreshToken(request));
        }
        catch (Exception e){
            return ResponseEntity.ok(new SimpleResponse(e+ "refresh error"));
        }

    }
@PostMapping("/logout")
    public void logout(){
        authService.logout();
    }


}
