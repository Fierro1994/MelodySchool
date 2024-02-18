package com.example.MelodySchool.controllers;

import com.example.MelodySchool.entity.ImagePromo;
import com.example.MelodySchool.models.request.GetAllImagePromoReq;
import com.example.MelodySchool.models.request.ImagePromoReq;
import com.example.MelodySchool.service.ImagePromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/imagepromo")
@RequiredArgsConstructor
public class ImagePromoController {
    @Autowired
    ImagePromoService imagePromoService;
    @PostMapping
    public ResponseEntity<ImagePromo> upload(@RequestParam("file") MultipartFile file, Long userId) throws IOException {

        return new ResponseEntity<>(imagePromoService.upload( file, userId),HttpStatus.CREATED);

    }
    @GetMapping(path = "/{id}/{key}")
    public ResponseEntity<Object> download(@PathVariable("id") Long id, @PathVariable("key") String key) {
        try {
            return imagePromoService.download(id, key);

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "/listpromo")
    public ResponseEntity<?> showAll(@RequestBody GetAllImagePromoReq req ) throws IOException {
        return  ResponseEntity.ok(imagePromoService.showAll(req.getUserId()));
    }

    @DeleteMapping(value = "/{id}/{key}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @PathVariable("key") String key) {
        try {
            imagePromoService.delete(id, key);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}