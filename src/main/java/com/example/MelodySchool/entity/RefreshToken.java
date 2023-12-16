package com.example.MelodySchool.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(	name = "refresh_tokens")
@Data
public class RefreshToken{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "InvoiceWarningEvent_generator")
    @SequenceGenerator(name="InvoiceWarningEvent_generator", sequenceName = "InvoiceWarningEvent_seq", allocationSize = 1)
    protected Integer id;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expiryDate;

}