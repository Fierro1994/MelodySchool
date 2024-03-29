package com.example.MelodySchool.controllers;



import com.example.MelodySchool.models.request.MainPageModuleAddReq;
import com.example.MelodySchool.models.request.MainPageModuleGetReq;
import com.example.MelodySchool.service.MainPageModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/mainpage/settings")
@RequiredArgsConstructor
public class MainPageController {
    private final MainPageModuleService mainPageModuleService;

    @PostMapping("/getmodule")
    public ResponseEntity<?> getmodule(@RequestBody MainPageModuleGetReq request) throws SQLException {
        return ResponseEntity.ok(mainPageModuleService.mainPageModulesGet(request));
    }

    @PostMapping("/updatemodule")
    public ResponseEntity<?> updatemodule(@RequestBody MainPageModuleAddReq request) {
        return ResponseEntity.ok(mainPageModuleService.updateMainPageModule(request));
    }


}
