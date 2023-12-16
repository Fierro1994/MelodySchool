package com.example.MelodySchool.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import lombok.*;
import java.io.Serializable;

@Entity
@Table(name = "Roles")
@NoArgsConstructor
@Getter
@Setter
public class Role extends IdBasedEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }

    public ERole getName() {
        return name;
    }
}