package com.examly.springapp.service;

import com.examly.springapp.entity.Passenger;
import com.examly.springapp.repository.PassengerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PassengerService {
    private final PassengerRepository passengerRepository;

    public void deleteAllPassengerByBookingId(int bookingId){
        passengerRepository.deleteAllByBookingId(bookingId);
    }

    public Passenger save(Passenger passenger) {
        return passengerRepository.save(passenger);
    }
}
