package com.examly.springapp.entity;

import com.examly.springapp.security.utils.ApplicationUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

import static com.examly.springapp.security.utils.ApplicationUserRole.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private int id;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Basic
    @Column(name = "user_role")
    private String userRole;

    public User(String email, String password, String name, String mobileNumber, String userRole) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return (userRole.equalsIgnoreCase("USER")) ? USER.getGrantedAuthorities() : ADMIN.getGrantedAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
