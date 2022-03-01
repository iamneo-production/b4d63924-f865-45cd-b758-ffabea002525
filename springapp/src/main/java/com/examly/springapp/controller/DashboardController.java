package com.examly.springapp.controller;

import com.examly.springapp.entity.Vehicle;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DashboardController {

    @GetMapping("/admin/dashboard")
    public List<Vehicle> adminDashboard(){
        return  new ArrayList<>();
    }

    @GetMapping("/user/dashboard")
    public List<Vehicle> userDashboard(){
        return  new ArrayList<>();
    }
}
