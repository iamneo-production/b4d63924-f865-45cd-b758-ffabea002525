package com.examly.springapp.security.utils;

public enum ApplicationUserPermission {
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    PASSENGER_READ("passenger:read"),
    PASSENGER_WRITE("passenger:write"),
    VEHICLE_READ("vehicle:read"),
    VEHICLE_WRITE("vehicle:write"),
    BOOKING_READ("booking:read"),
    BOOKING_WRITE("booking:write");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
