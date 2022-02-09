package com.examly.springapp.controller;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
public class UserAuthenticationController {
    private final UserService userService;

    @PostMapping(path = "/admin/signup")
    public String adminRegister(@RequestBody User user){
        try {
            return userService.register(user);
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
        }
    }

    @PostMapping(path = "/admin/login")
    public Boolean adminLogin(@RequestBody LoginModel loginModel){
        try {
            return userService.login(loginModel);
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,exception.getMessage());
        }
    }

    @PostMapping(path = "/user/signup")
    public String userRegister(@RequestBody User appUser){
        try {
            return userService.register(appUser);
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
        }
    }

    @PostMapping(path = "/user/login")
    public Boolean userLogin(@RequestBody LoginModel loginModel){
        try {
            return userService.login(loginModel);
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,exception.getMessage());
        }
    }
}
