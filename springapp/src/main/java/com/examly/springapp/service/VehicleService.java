package com.examly.springapp.service;

import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.repository.VehicleRepository;
import lombok.AllArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public Optional<Vehicle> findById(int vehicleId) {
        return vehicleRepository.findById(vehicleId);
    }
}
