package com.examly.springapp.controller;

import com.examly.springapp.entity.User;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserDetailsResponseModel;
import com.examly.springapp.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
public class UserAuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping(path = "/signup")
    public String register(@RequestBody User user) {
        try {
            return authenticationService.register(user);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<UserDetailsResponseModel> authentication(@RequestBody LoginModel loginModel) {
        try {
            return authenticationService.authentication(loginModel);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
