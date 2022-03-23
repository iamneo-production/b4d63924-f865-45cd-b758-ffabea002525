package com.examly.springapp.security.jwt;

import com.google.common.base.Strings;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

public class JwtTokenVerifierFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    public JwtTokenVerifierFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        try{
            String token = authorizationHeader.replace("Bearer ","");
            String username = jwtUtil.extractUsername(token);
            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = jwtUtil.extractSimpleGrantedAuthority(token);
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, simpleGrantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (JwtException e){
            throw new IllegalStateException("Token can not be trusted");
        }

        filterChain.doFilter(request,response);
    }
}
