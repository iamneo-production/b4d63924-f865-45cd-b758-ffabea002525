package com.examly.springapp.controller;

import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.service.VehicleService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
public class VehicleController {
	private final VehicleService vehicleService;

    @PostMapping("/admin/addVehicle")
    public void addVehicle(@RequestBody Vehicle vehicle){
    	try {
             vehicleService.addVehicle(vehicle);
        }catch (Exception exception){
        	System.out.println(exception);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
            
        }
    }

    @PutMapping("/admin/editVehicle/{vehicleId}")
    public Vehicle editVehicle(@PathVariable int vehicleId, @RequestBody Vehicle vehicle){
        Vehicle editedVehicle;
		try {
			editedVehicle = vehicleService.editVehicle(vehicleId, vehicle);
	        return editedVehicle;
		} catch (Exception exception) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,exception.getMessage());
		
		}
    }

    @DeleteMapping("/admin/deleteVehicle/{vehicleId}")
    public Vehicle deleteVehicle(@PathVariable int vehicleId){
        try {
			Vehicle deletedVehicle=vehicleService.deleteVehicle(vehicleId);
			return deletedVehicle;
		} catch (Exception exception) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,exception.getMessage());
		
		}
    }
    

}
