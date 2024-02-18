package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.ImagePromo;
import com.example.MelodySchool.entity.User;
import com.example.MelodySchool.repository.ImagePromoRepos;
import com.example.MelodySchool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ImagePromoService {
    @Autowired
    private ImagePromoRepos imagePromoRepos;
    @Autowired
    private FileManager fileManager;
    @Autowired
    private UserRepository userRepository;

    @Transactional(rollbackFor = {IOException.class})
    public ImagePromo upload(MultipartFile resource, Long userId) throws IOException {
        String key = UUID.randomUUID().toString();
        ImagePromo createdFile = new ImagePromo(resource.getOriginalFilename(), resource.getSize(), key, LocalDateTime.now());
        User user = userRepository.findById(userId).get();
        fileManager.upload(resource, key, user.getId());
        List<ImagePromo> usersImagePromos = user.getImagePromos();
        usersImagePromos.add(createdFile);
        user.setImagePromos(usersImagePromos);
        imagePromoRepos.saveAll(usersImagePromos);
        userRepository.save(user);
        return createdFile;
    }

    public ResponseEntity<Object> download(Long id, String key) throws IOException {
        return fileManager.download(id, key);
    }

    @Transactional(readOnly = true)
    public ImagePromo findByKey(String key) {
        return imagePromoRepos.findByKey(key).get();
    }

    @Transactional(rollbackFor = {IOException.class})
    public void delete(Long id, String key) throws IOException {
        ImagePromo file = imagePromoRepos.findByKey(key).get();
        imagePromoRepos.delete(file);
        fileManager.delete(id, key);
    }

    public ResponseEntity<?> showAll(Long id) throws IOException {
        return fileManager.downloadAll(userRepository.findById(id).get());
    }
}