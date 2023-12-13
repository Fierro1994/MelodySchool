package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.Student;
import com.example.MelodySchool.models.AuthResponse;
import com.example.MelodySchool.models.CreateUserRequest;
import com.example.MelodySchool.models.LoginRequest;
import com.example.MelodySchool.repository.StudentRepository;
import com.example.MelodySchool.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SecurityService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse authResponseStudent (LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        StudentDetails studentDetails = (StudentDetails) authentication.getPrincipal();
        List<String> roles = studentDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return AuthResponse.builder()
                .id(studentDetails.getId())
                .token(jwtUtils.generateJwtToken(studentDetails))
                .username(studentDetails.getUsername())
                .email(studentDetails.getEmail())
                .roles(roles)
                .build();
    }

    public AuthResponse createUserResponse (CreateUserRequest createUserRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                createUserRequest.getUsername(),
                createUserRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        StudentDetails studentDetails = (StudentDetails) authentication.getPrincipal();
        List<String> roles = studentDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return AuthResponse.builder()
                .id(studentDetails.getId())
                .token(jwtUtils.generateJwtToken(studentDetails))
                .username(studentDetails.getUsername())
                .email(studentDetails.getEmail())
                .roles(roles)
                .build();

    }
    public void register(CreateUserRequest userRequest){
        var student = Student.builder()
                        .username(userRequest.getUsername())
                                .email(userRequest.getEmail())
                                        .password(passwordEncoder.encode(userRequest.getPassword()))
                                                .build();

        student.setRoles(userRequest.getRoles());
        studentRepository.save(student);

    }

    public void logout(){
        var currentPrincipal = new  SecurityContextHolder().getContext().getAuthentication().getPrincipal();
        if (currentPrincipal instanceof StudentDetails studentDetails){
            Long userid = studentDetails.getId();
        }
    }
}
