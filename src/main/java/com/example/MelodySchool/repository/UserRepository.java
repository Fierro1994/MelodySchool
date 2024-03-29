package com.example.MelodySchool.repository;

import com.example.MelodySchool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.enabled=true WHERE a.email=?1")
    int enableUser(String email);
    Boolean existsByEmail(String email);
}
