package com.example.MelodySchool.controllers;

import com.example.MelodySchool.models.request.ThemeSelectGetReq;
import com.example.MelodySchool.models.request.ThemeSelectReq;
import com.example.MelodySchool.service.InterfaceService;
import com.example.MelodySchool.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/settings/interface")
@RequiredArgsConstructor
public class InterfaceController {

    private final InterfaceService interfaceService;
    private final ProfileService profileService;

    @PostMapping("/selecttheme")
    public ResponseEntity<?> selecttheme(@RequestBody ThemeSelectReq request) {
        return ResponseEntity.ok(interfaceService.themeSelect(request));
    }
    @PostMapping("/getselecttheme")
    public ResponseEntity<?> getselecttheme(@RequestBody ThemeSelectGetReq request) {
        return ResponseEntity.ok(interfaceService.getThemeSelect(request));
    }

}
