package com.example.MelodySchool.models;

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
    private Set<ERole> roles;
    private String password;
}