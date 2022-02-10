package com.examly.springapp.repository;

import com.examly.springapp.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByUserId(int userId);
    Optional<Booking> findByUserIdAndId(int userId, int bookingId);
}
