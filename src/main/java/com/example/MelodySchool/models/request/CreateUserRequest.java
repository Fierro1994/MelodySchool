package com.example.MelodySchool.models.request;

import com.example.MelodySchool.entity.ERole;
import lombok.*;

import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Set<String> roles;
}