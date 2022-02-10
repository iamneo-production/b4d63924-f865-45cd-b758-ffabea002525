package com.examly.springapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private int id;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "image_url")
    private String imageUrl;

    @Basic
    @Column(name = "address")
    private String address;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "available_status")
    private String availableStatus;

    @Basic
    @Column(name = "time")
    private Time time;

    @Basic
    @Column(name = "capacity")
    private int capacity;

    @Basic
    @Column(name = "ticket_price")
    private double ticketPrice;

    public Vehicle(String name, String imageUrl, String address, String description, String availableStatus, Time time, int capacity, double ticketPrice) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.address = address;
        this.description = description;
        this.availableStatus = availableStatus;
        this.time = time;
        this.capacity = capacity;
        this.ticketPrice = ticketPrice;
    }
}
