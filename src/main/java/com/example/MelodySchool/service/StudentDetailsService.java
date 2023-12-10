package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.Student;
import com.example.MelodySchool.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentDetailsService implements UserDetailsService {

    @Autowired
    StudentRepository studentRepository;

    @Override
    @Transactional
    public StudentDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return new StudentDetails(student);
    }

}
