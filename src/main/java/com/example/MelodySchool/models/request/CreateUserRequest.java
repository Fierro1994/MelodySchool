package com.example.MelodySchool.models.request;

import com.example.MelodySchool.entity.ERole;
import lombok.*;

import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {
    private String username;
    private String email;
    private Set<String> roles;
    private String password;
}