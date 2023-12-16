package com.example.MelodySchool.controllers;

import com.example.MelodySchool.models.request.MessageMail;
import com.example.MelodySchool.service.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MailController {

    @Autowired
    MailSender mailSender;
    @PostMapping("/mailsend")
    public ResponseEntity<?> mailsendUser(@RequestBody MessageMail messageMail) {
        String name = messageMail.getName();
        String message =  messageMail.getMessage();
        String numberPhone = messageMail.getNumberPhone();
        mailSender.send(name ,numberPhone, message);;
        return ResponseEntity.ok(200);
    }


}
