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
    	String toCapitalize=capitalize(vehicle.getName());
    	vehicle.setName(toCapitalize);
    	boolean vehicleIsPresent=vehicleRepository.findByName(vehicle.getName()).isPresent();
    	if(vehicleIsPresent)
    		throw new IllegalStateException("The vehicle "+vehicle.getName() +" already exists");
    	vehicleRepository.save(vehicle);
    }
    
    public Vehicle deleteVehicle(int vehicleId) {
    	boolean vehicleIsPresent=vehicleRepository.findById(vehicleId).isPresent();
    	Vehicle deletedVehicle;
    	if(!vehicleIsPresent)
    		throw new IllegalStateException("The vehicleId "+vehicleId +" does not exist");
    	deletedVehicle = vehicleRepository.getOne(vehicleId);
    	vehicleRepository.deleteById(vehicleId);
    	return deletedVehicle;
    }
    
    public Vehicle editVehicle(int vehicleId,Vehicle vehicle) {
    	boolean vehicleIsPresent=vehicleRepository.findById(vehicleId).isPresent();
    	if(!vehicleIsPresent)
    		throw new IllegalStateException("The vehicleId "+vehicleId +" does not exist");
    	
    	Vehicle updatedVehicle=vehicleRepository.getOne(vehicleId);
    	String toCapitalize=capitalize(vehicle.getName());
    	vehicle.setName(toCapitalize);
    	
    	updatedVehicle.setName(vehicle.getName());
    	updatedVehicle.setImageUrl(vehicle.getImageUrl());
    	updatedVehicle.setAddress(vehicle.getAddress());
    	updatedVehicle.setDescription(vehicle.getDescription());
    	updatedVehicle.setAvailableStatus(vehicle.getAvailableStatus());
    	updatedVehicle.setTime(vehicle.getTime());
    	updatedVehicle.setCapacity(vehicle.getCapacity());
    	updatedVehicle.setTicketPrice(vehicle.getTicketPrice());
    	
    	vehicleRepository.save(updatedVehicle);
    	return updatedVehicle;
    }
    private String capitalize(String name) {
    	name=name.toLowerCase().trim();
    	char ch[]=name.toCharArray();
    	ch[0]=(char)(ch[0]-32);
    	for(int i=0;i<ch.length-1;i++) 
    		if(ch[i]==' ') 
    			ch[i+1]=(char)(ch[i+1]-32);
    	return String.valueOf(ch);
    }

    
}
