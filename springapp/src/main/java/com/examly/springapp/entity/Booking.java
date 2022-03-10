package com.examly.springapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private int id;

    @Basic
    @Column(name = "from_date")
    private Date fromDate;

    @Basic
    @Column(name = "to_date")
    private Date toDate;

    @Basic
    @Column(name = "number_of_passanger")
    private int numberOfPassenger;

    @Basic
    @Column(name = "total_price")
    private double totalPrice;

    @ManyToOne(cascade=CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne(cascade=CascadeType.REMOVE)
    @JoinColumn(name = "vehicle_id", referencedColumnName = "id", nullable = false)
    private Vehicle vehicle;

    @Basic
    @OneToMany(mappedBy="booking", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Passenger> passengers = new HashSet<Passenger>();

    public Booking(Date fromDate, Date toDate, int numberOfPassenger, double totalPrice) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.numberOfPassenger = numberOfPassenger;
        this.totalPrice = totalPrice;
    }
}
