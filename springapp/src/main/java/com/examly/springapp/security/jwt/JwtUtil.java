package com.examly.springapp.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtUtil {
    private final String SECRET_KEY = "securekeysecurekeysecurekeysecurekeysecurekeysecurekeysecurekeysecurekey";
    private final long TOKEN_EXPIRATION_AFTER_DAYS = 2;

    public String generateToken(UserDetails userDetails){
        String token = Jwts.builder().setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(TOKEN_EXPIRATION_AFTER_DAYS)))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
        return token;
    }

    public Jws<Claims> extractJwsClaims(String token){
        return Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .parseClaimsJws(token);
    }

    public Claims extractBody(String token){
        return extractJwsClaims(token).getBody();
    }

    public String extractUsername(String token) {
        return extractBody(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractBody(token).getExpiration();
    }

    public List<Map<String, String>> extractAuthority(String token){
        return (List<Map<String, String>>) extractBody(token).get("authorities");
    }

    public Set<SimpleGrantedAuthority> extractSimpleGrantedAuthority(String token){
        return extractAuthority(token).stream().map(m -> new SimpleGrantedAuthority(m.get("authority"))).collect(Collectors.toSet());
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}