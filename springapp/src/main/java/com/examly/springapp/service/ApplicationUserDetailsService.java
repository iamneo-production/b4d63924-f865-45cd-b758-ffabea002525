package com.examly.springapp.service;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("this email id %s is not registered", email)) );
    }

    public String register(User user){
        boolean emailExist = userRepository.findByEmail(user.getEmail()).isPresent();
        if (emailExist) throw new IllegalStateException("this email is already registered");
        if(!validUserRole(user.getUserRole())) throw new IllegalStateException("user role not valid");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return capitalize(user.getUserRole())+" added";
    }

    private String capitalize(String string){
        return string.substring(0,1).toUpperCase() + string.substring(1).toLowerCase();
    }

    private boolean validUserRole(String userRole){
        if (userRole == null) return false;
        return userRole.equalsIgnoreCase("USER") ||  userRole.equalsIgnoreCase("ADMIN");
    }

}
