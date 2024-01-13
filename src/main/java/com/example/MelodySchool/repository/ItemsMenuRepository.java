package com.example.MelodySchool.repository;

import com.example.MelodySchool.entity.ItemsMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ItemsMenuRepository extends JpaRepository<ItemsMenu, Long> {
    Optional<ItemsMenu> findByName(String name);

}
