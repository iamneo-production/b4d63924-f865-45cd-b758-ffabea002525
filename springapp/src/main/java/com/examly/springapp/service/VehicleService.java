package com.examly.springapp.service;

import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public Optional<Vehicle> findById(int vehicleId) {
        return vehicleRepository.findById(vehicleId);
    }
    
    public List<Vehicle> getVehicles(){
    	return vehicleRepository.findAll();
    }
    
    public void addVehicle(Vehicle vehicle) {
    	vehicle.setName(capitalize(vehicle.getName()));
    	boolean vehicleIsPresent = vehicleRepository.findByName(vehicle.getName()).isPresent();
    	if(vehicleIsPresent)
    		throw new IllegalStateException("The vehicle "+vehicle.getName() +" already exists");
    	vehicleRepository.save(vehicle);
    }

    public Vehicle deleteVehicle(int vehicleId) {
    	Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
    	if(vehicle == null)
    		throw new IllegalStateException("The vehicleId "+vehicleId +" does not exist");
    	vehicleRepository.delete(vehicle);
    	return vehicle;
    }

	public Vehicle getVehicleById(int vehicleId){
		Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
		return vehicle;
	}
    
    public Vehicle editVehicle(int vehicleId,Vehicle newVehicle) {
    	Vehicle oldVehicle = vehicleRepository.findById(vehicleId).orElse(null);
    	if(oldVehicle == null)
    		throw new IllegalStateException("The vehicleId "+vehicleId +" does not exist");
    	
    	oldVehicle.setName(capitalize(newVehicle.getName()));
    	oldVehicle.setImageUrl(newVehicle.getImageUrl());
    	oldVehicle.setAddress(newVehicle.getAddress());
    	oldVehicle.setDescription(newVehicle.getDescription());
    	oldVehicle.setAvailableStatus(newVehicle.getAvailableStatus());
    	oldVehicle.setTime(newVehicle.getTime());
    	oldVehicle.setCapacity(newVehicle.getCapacity());
    	oldVehicle.setTicketPrice(newVehicle.getTicketPrice());
    	
    	return vehicleRepository.save(oldVehicle);
    }

    private String capitalize(String string) {
    	string=string.toLowerCase().trim();
    	char parts[]=string.toCharArray();
    	parts[0]=(char)(parts[0]-32);
    	for(int i=0;i<parts.length-1;i++)
    		if(parts[i]==' ')
    			parts[i+1]=(char)(parts[i+1]-32);
    	return String.valueOf(parts);
    }

    
}
