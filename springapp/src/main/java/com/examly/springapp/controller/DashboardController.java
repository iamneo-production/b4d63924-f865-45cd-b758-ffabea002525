package com.examly.springapp.controller;

import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.service.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class DashboardController {
    private final VehicleService vehicleService;

    @GetMapping("/admin/dashboard")
    public List<Vehicle> adminDashboard(){
        return  vehicleService.getVehicles();
    }

    @GetMapping("/user/dashboard")
    public List<Vehicle> userDashboard(){
        return  vehicleService.getVehicles();
    }
}
