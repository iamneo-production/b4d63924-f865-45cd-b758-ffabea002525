package com.examly.springapp.service;

import com.examly.springapp.repository.PassengerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PassengerService {
    private final PassengerRepository passengerRepository;
}
