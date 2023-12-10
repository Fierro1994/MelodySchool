package com.example.MelodySchool.service;

import java.util.Collection;
import com.example.MelodySchool.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class StudentDetails implements UserDetails {


    private Student student;
    private Collection<? extends GrantedAuthority> authorities;

    public StudentDetails(Student student) {
        this.student = student;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return student.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.name())).toList();
    }

    @Override
    public String getPassword() {
        return student.getPassword();
    }

    @Override
    public String getUsername() {
        return student.getUsername();
    }

    public Long getId() {
        return student.getId();
    }

    public String getEmail() {
        return student.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
