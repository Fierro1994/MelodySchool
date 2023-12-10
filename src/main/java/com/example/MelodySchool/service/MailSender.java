package com.example.MelodySchool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSender {

    @Value("${spring.mail.username}")
    private String userName;
    @Autowired
    JavaMailSender javaMailSender;

    public void send(String name, String numberPhone, String message){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(userName);
        simpleMailMessage.setSubject("Обратная связь");
        simpleMailMessage.setTo("26roma261994@mail.ru");
        simpleMailMessage.setText("Имя: " + name + "\n" + "Номер телефона: " + numberPhone + "\n" + "Сообщение: "+message);

        javaMailSender.send(simpleMailMessage);

    }
}
