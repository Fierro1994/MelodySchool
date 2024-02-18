package com.example.MelodySchool.models.response;

import com.example.MelodySchool.entity.ETheme;
import com.example.MelodySchool.entity.ItemsMenu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AuthResponse {
    private String accessToken;
    private List<ItemsMenu> itemsMenus;
    private ETheme theme;
}

