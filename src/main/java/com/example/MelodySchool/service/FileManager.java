package com.example.MelodySchool.service;


import com.example.MelodySchool.entity.ImagePromo;
import com.example.MelodySchool.entity.User;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileManager {
    public void upload(MultipartFile file, String key, Long id) throws IOException {
        Path path = Paths.get("src/main/resources/storage/" + id + "/" + key);
        File directory = new File(path.getParent().toString());
        if (!directory.exists()) {
            directory.mkdir();
        }
        File convertFile = new File("src/main/resources/storage/" + id + "/" + key);
        convertFile.createNewFile();
        FileOutputStream fileout = new FileOutputStream(convertFile);
        fileout.write(file.getBytes());
        fileout.close();
    }

    public ResponseEntity<Object> download(Long id, String key) throws IOException {
        Path path = Paths.get("src/main/resources/storage/" + id + "/" + key);
        File file = new File(path.toUri());
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        Resource resource2 = new UrlResource(path.toUri());
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        ResponseEntity<Object>
                responseEntity = ResponseEntity.ok().headers(headers).contentLength(
                file.length()).contentType(MediaType.parseMediaType("application/txt")).body(resource);
        return responseEntity;
    }

    public ResponseEntity<?> downloadAll(User user) throws IOException {
        List<ImagePromo> imagePromos = user.getImagePromos();
        List<String> imageKeys = new ArrayList<>();
        imagePromos.forEach(el -> {
            imageKeys.add(el.getKey());
        });
        return ResponseEntity.ok().body(imageKeys);
    }

    public void delete(Long id, String key) throws IOException {
        Path path = Paths.get("src/main/resources/storage/" + id + "/" + key);
        Files.delete(path);
    }
}
