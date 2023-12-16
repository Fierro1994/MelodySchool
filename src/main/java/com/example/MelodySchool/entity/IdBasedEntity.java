package com.example.MelodySchool.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.IdGeneratorType;
import org.hibernate.generator.AnnotationBasedGenerator;


@MappedSuperclass
@Getter
@Setter
public class IdBasedEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    protected Integer id;
}