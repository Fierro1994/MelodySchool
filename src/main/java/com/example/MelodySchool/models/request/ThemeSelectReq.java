package com.example.MelodySchool.models.request;

import com.example.MelodySchool.entity.ETheme;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeSelectReq {
    private ETheme name;
    private Long userId;
}
