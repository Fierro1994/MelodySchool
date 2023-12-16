package com.example.MelodySchool.controllers;


import com.example.MelodySchool.repository.UserRepository;
import com.example.MelodySchool.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
public class SiteController {

    private final UserRepository userRepository;
    private final AuthService authService;
//    @GetMapping("/")
//    public String home(){
//        return "index";
//    }
    @GetMapping("/register")
    public String auth(){
        return "register";
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public String userAccess() {
        return "teacher";
    }

    @GetMapping("/registerstudent")
    public String register() {
        return "studentregister";
    }



}
