package com.example.MelodySchool.models.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class MessageMail {
    private String name;
    private String numberPhone;
    private String message;

}
