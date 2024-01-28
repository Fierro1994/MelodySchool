package com.example.MelodySchool.repository;

import com.example.MelodySchool.entity.Moments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MomentsRepository extends JpaRepository<Moments, Long> {
    Optional<Moments> findBySerialId(String serialId);
}
