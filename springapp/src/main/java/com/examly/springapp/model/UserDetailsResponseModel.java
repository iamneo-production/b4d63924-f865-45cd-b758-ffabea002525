package com.examly.springapp.model;

import com.examly.springapp.entity.User;
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

    public UserDetailsResponseModel(User userObject) {
        this.id = userObject.getId();
        this.email = userObject.getEmail();
        this.name = userObject.getName();
        this.mobileNumber = userObject.getMobileNumber();
        this.userRole = userObject.getUserRole();
    }
}
