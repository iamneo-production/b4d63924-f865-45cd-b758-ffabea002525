package com.examly.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Login {
    private String email;
    private String password;
}
