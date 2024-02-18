package com.example.MelodySchool.models.response;


import com.example.MelodySchool.entity.MainPageModule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class MainPageModuleResponse {
    private List<MainPageModule> menu;
}
