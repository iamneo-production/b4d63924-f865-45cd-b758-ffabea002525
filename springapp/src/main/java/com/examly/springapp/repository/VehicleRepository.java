package com.examly.springapp.repository;

import com.examly.springapp.entity.Vehicle;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
	Optional<Vehicle> findByName(String name);
}
