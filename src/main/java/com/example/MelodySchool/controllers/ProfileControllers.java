package com.example.MelodySchool.controllers;

import com.example.MelodySchool.models.request.MenuSettingsAddReq;
import com.example.MelodySchool.models.request.MenuSettingsGetReq;
import com.example.MelodySchool.service.ItemsMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/profile/settings")
@RequiredArgsConstructor
public class ProfileControllers {
    private final ItemsMenuService settingsService;


    @PostMapping("/getmenuelement")
    public ResponseEntity<?> getmenuelement(@RequestBody MenuSettingsGetReq request) throws SQLException {
        return ResponseEntity.ok(settingsService.menuItemsSetting(request));
    }

    @PostMapping("/updatemenuelement")
    public ResponseEntity<?> updatemenuelement(@RequestBody MenuSettingsAddReq request) {
        return ResponseEntity.ok(settingsService.updateItemsMenu(request));
    }
}
