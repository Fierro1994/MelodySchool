package com.example.MelodySchool.repository;

import com.example.MelodySchool.entity.RefreshToken;
import com.example.MelodySchool.entity.User;
import com.example.MelodySchool.service.UserDetailsImpl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    @Modifying
    int deleteByUser(User user);

    Optional<RefreshToken> findByUserId(Long userId);
}
