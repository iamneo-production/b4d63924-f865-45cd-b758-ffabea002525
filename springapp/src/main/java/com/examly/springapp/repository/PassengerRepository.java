package com.examly.springapp.repository;

import com.examly.springapp.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger,Integer> {
    void deleteAllByBookingId(int bookingId);
}
