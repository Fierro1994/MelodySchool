package com.example.MelodySchool.models.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AuthResponse {
    private String acesstoken;
    private String refreshToken;
    private Integer id;
    private String username;
    private String email;
    private List<String> roles;
}

