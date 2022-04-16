package com.examly.springapp.security.utils;




import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.examly.springapp.security.utils.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    USER(Sets.newHashSet(VEHICLE_READ, BOOKING_READ, BOOKING_WRITE, PASSENGER_READ, PASSENGER_WRITE,USER_READ,USER_WRITE)),
    ADMIN(Sets.newHashSet(VEHICLE_READ, VEHICLE_WRITE,USER_READ,USER_WRITE));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
