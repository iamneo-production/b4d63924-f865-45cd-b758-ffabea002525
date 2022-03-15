package com.examly.springapp.service;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.entity.Passenger;
import com.examly.springapp.entity.User;
import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.repository.BookingRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final PassengerService passengerService;
    private final VehicleService vehicleService;
    private final ApplicationUserDetailsService applicationUserDetailsService;

    public List<Booking> getAllBooking() {
        User currentLoggedInUser = applicationUserDetailsService.getCurrentLoggedInUser();
        return bookingRepository.findByUserId(currentLoggedInUser.getId());
    }

    @Transactional
    public Booking createBooking(int vehicleId, Booking booking){

        // check if vehicle with given vehicleId is existing in database or not
        Optional<Vehicle> vehicleOptional = vehicleService.findById(vehicleId);
        if (vehicleOptional.isEmpty()) throw new IllegalStateException("Vehicle is not present");

        // if vehicle exists check for its available status
        Vehicle vehicle = vehicleOptional.get();
        if (!vehicle.getAvailableStatus().equalsIgnoreCase("Available")) throw new IllegalStateException(vehicle.getName()+" is not available to book");

        // check if no.of passengers and size of passenger list passed are equal or not
        if (booking.getNumberOfPassanger() != booking.getPassengers().size()) throw new IllegalStateException("Number of passenger and list of passenger is not matched");

        // check for passanger capacity
        if (booking.getNumberOfPassanger() > vehicle.getCapacity()) throw new IllegalStateException("Passenger capacity exceeded");

        //fetch current logged user and passanger list, then create booking
        User currentLoggedInUser = applicationUserDetailsService.getCurrentLoggedInUser();
        Set<Passenger> passangers = booking.getPassengers();

        // registering user, vehicle and passangers on current booking
        booking.setVehicle(vehicle);
        booking.setUser(currentLoggedInUser);
        booking.setPassengers(passangers);

        // registering current booking on each passanger
        for (Passenger passanger : passangers){
            passanger.setBooking(booking);
        }

        Booking newBooking = bookingRepository.save(booking);

        // modifying vehicle capacity and available status
        modifyVehicleCapacity(newBooking, "createBooking");
        modifyVehicleAvailability(booking);

        return newBooking;
    }


    @Transactional
    public int cancelBooking(int bookingId) {
        // fetch current logged in user id then, fetch the particular booking of that user
        int currentUserId = applicationUserDetailsService.getCurrentLoggedInUser().getId();
        Optional<Booking> currentBookingOptional = bookingRepository.findByUserIdAndId(currentUserId,bookingId);

        // check if specified booking exists
        boolean bookingPresent = currentBookingOptional.isPresent();
        if (!bookingPresent) throw new IllegalStateException("Couldn't find requested booking");

        Booking currentBooking = currentBookingOptional.get();

        // modifying vehicle capacity
        modifyVehicleCapacity(currentBooking, "deleteBooking");
        modifyVehicleAvailability(currentBooking);

        // delete booking
        bookingRepository.deleteById(bookingId);

        return bookingId;

    }

    @Transactional
    public Booking editBooking(int bookingId, Booking updatedBooking) {
        // fetch current logged in user id then, fetch the particular booking of that user
        int currentUserId = applicationUserDetailsService.getCurrentLoggedInUser().getId();
        Optional<Booking> currentBookingOptional = bookingRepository.findByUserIdAndId(currentUserId,bookingId);

        // check if specified booking exists
        boolean bookingPresent = currentBookingOptional.isPresent();
        if (!bookingPresent) throw new IllegalStateException("Couldn't find requested booking");

        Booking currentBooking = currentBookingOptional.get();

        // we only give the permission to change from date and to date
        currentBooking.setFromDate(updatedBooking.getFromDate());
        currentBooking.setToDate(updatedBooking.getToDate());

        bookingRepository.save(currentBooking);

        return currentBooking;
    }

    public void modifyVehicleCapacity(Booking booking, String operation){
        Vehicle vehicle = booking.getVehicle();
        int vehicleId = vehicle.getId();
        int vehicleCapacity = vehicle.getCapacity();
        int noOfPassangersInBooking = booking.getNumberOfPassanger();
        if (operation == "deleteBooking"){
            vehicle.setCapacity(vehicleCapacity + noOfPassangersInBooking);
        }
        else if(operation == "createBooking"){
            vehicle.setCapacity(vehicleCapacity - noOfPassangersInBooking);
        }
        vehicleService.editVehicle(vehicleId,vehicle);
    }

    public void modifyVehicleAvailability(Booking booking){
        Vehicle vehicle = booking.getVehicle();
        int vehicleId = vehicle.getId();
        int vehicleCapacity = vehicle.getCapacity();
        if (vehicleCapacity == 0 ){
            vehicle.setAvailableStatus("Unavailable");
        }

        else if (vehicleCapacity > 0) {
            vehicle.setAvailableStatus("Available");
        }
        vehicleService.editVehicle(vehicleId,vehicle);
    }

}
