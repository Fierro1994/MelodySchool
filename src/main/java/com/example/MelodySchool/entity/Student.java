package com.example.MelodySchool.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "user_name")
    private String username;
    private String password;
    private String email;
    @ElementCollection(targetClass = ERole.class, fetch = FetchType.EAGER)
    @JoinTable(name = "students_roles",
            joinColumns = @JoinColumn(name = "student_id"))
    @Column(name = "roles", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<ERole> roles = new HashSet<>();
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String address;
    @Column(name = "number_phone")
    private String numberPhone;
}
