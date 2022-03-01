package com.examly.springapp.controller;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.entity.User;
import com.examly.springapp.service.ApplicationUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
public class UserAuthenticationController {
    private final ApplicationUserDetailsService applicationUserDetailsService;

    @PostMapping(path = "/signup")
    public String register(@RequestBody User user){
        try {
            return applicationUserDetailsService.register(user);
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
        }
    }
}
