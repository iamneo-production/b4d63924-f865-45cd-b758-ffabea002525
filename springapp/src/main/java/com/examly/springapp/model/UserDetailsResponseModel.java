package com.examly.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponseModel {
    private int id;
    private String email;
    private String name;
    private String mobileNumber;
    private String userRole;
}
