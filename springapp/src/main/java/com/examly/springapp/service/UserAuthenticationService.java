package com.examly.springapp.service;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserAuthenticationService {
    private final UserRepository userRepository;

    public String register(User user){
        boolean emailExist = userRepository.findByEmail(user.getEmail()).isPresent();
        if (emailExist) throw new IllegalStateException("this email is already registered");

        userRepository.save(user);
        return capitalize(user.getUserRole())+" added";
    }

    public Boolean login(LoginModel loginModel){
        Optional<User> userOptional = userRepository.findByEmail(loginModel.getEmail());
        if(userOptional.isEmpty()) return false;

        User user = userOptional.get();
        return isValidCredential(loginModel, user);
    }

    private Boolean isValidCredential(LoginModel loginModel, User user) {
        return user.getEmail().equals(loginModel.getEmail()) && user.getPassword().equals(loginModel.getPassword());
    }

    private String capitalize(String string){
        return string.substring(0,1).toUpperCase() + string.substring(1).toLowerCase();
    }
}
