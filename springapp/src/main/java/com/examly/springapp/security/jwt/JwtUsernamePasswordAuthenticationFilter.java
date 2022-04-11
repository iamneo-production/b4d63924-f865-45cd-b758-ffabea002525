package com.examly.springapp.security.jwt;

import com.examly.springapp.entity.User;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserDetailsResponseModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JwtUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public JwtUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginModel loginModel = new ObjectMapper().readValue(request.getInputStream(), LoginModel.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginModel.getEmail(),loginModel.getPassword());
            return authenticationManager.authenticate(authentication);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authResult.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        response.addHeader("Authorization", "Bearer "+token);

        User userObject = (User) authResult.getPrincipal();
        UserDetailsResponseModel userDetailsResponseModel = new UserDetailsResponseModel(
                userObject.getId(),
                userObject.getEmail(),
                userObject.getName(),
                userObject.getMobileNumber(),
                userObject.getUserRole()
        );
        response.setHeader(HttpHeaders.CONTENT_TYPE,"application/json");
        response.getOutputStream().print(new ObjectMapper().writeValueAsString(userDetailsResponseModel));
        response.flushBuffer();
    }
}
