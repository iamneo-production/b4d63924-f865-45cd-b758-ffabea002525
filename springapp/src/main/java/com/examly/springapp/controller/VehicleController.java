package com.examly.springapp.controller;

import com.examly.springapp.entity.Vehicle;
import org.springframework.web.bind.annotation.*;

@RestController
public class VehicleController {

    @PostMapping("/admin/addVehicle")
    public void addVehicle(){
        System.out.println("add vehicle");
    }

    @PutMapping("/admin/editVehicle/{vehicleId}")
    public Vehicle editVehicle(@PathVariable String vehicleId, @RequestBody Vehicle vehicle){
        System.out.println("edit vehicle");
        return  null;
    }

    @DeleteMapping("/admin/deleteVehicle/{vehicleId}")
    public Vehicle deleteVehicle(@PathVariable String vehicleId){
        System.out.println("delete vehicle");
        return null;
    }

}
