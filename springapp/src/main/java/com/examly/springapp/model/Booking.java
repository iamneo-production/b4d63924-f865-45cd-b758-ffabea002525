package com.examly.springapp.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Booking {
    private int id;
    private Date fromDate;
    private Date toDate;
    private int numberOfPassanger;
    private double totalPrice;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "from_date")
    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    @Basic
    @Column(name = "to_date")
    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    @Basic
    @Column(name = "number_of_passanger")
    public int getNumberOfPassanger() {
        return numberOfPassanger;
    }

    public void setNumberOfPassanger(int numberOfPassanger) {
        this.numberOfPassanger = numberOfPassanger;
    }

    @Basic
    @Column(name = "total_price")
    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return id == booking.id &&
                numberOfPassanger == booking.numberOfPassanger &&
                Double.compare(booking.totalPrice, totalPrice) == 0 &&
                Objects.equals(fromDate, booking.fromDate) &&
                Objects.equals(toDate, booking.toDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fromDate, toDate, numberOfPassanger, totalPrice);
    }
}
