package com.examly.springapp.service;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.entity.Passenger;
import com.examly.springapp.entity.User;
import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.repository.BookingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final VehicleService vehicleService;
    private final ApplicationUserDetailsService applicationUserDetailsService;

    public List<Booking> getAllBooking() {
        User currentLoggedInUser = applicationUserDetailsService.getCurrentLoggedInUser();
        return bookingRepository.findByUserId(currentLoggedInUser.getId());
    }

    @Transactional
    public Booking createBooking(int vehicleId, Booking booking){

        Optional<Vehicle> vehicleOptional = vehicleService.findById(vehicleId);
        if (vehicleOptional.isEmpty()) throw new IllegalStateException("Vehicle is not present");
        Vehicle vehicle = vehicleOptional.get();
        if (!vehicle.getAvailableStatus().equalsIgnoreCase("Available")) throw new IllegalStateException(vehicle.getName()+" is not available to book");
        if (booking.getNumberOfPassenger() != booking.getPassengers().size()) throw new IllegalStateException("Number of passenger and list of passenger is not matched");
        if (booking.getNumberOfPassenger() > vehicle.getCapacity()) throw new IllegalStateException("Passenger capacity exceeded");
        User currentLoggedInUser = applicationUserDetailsService.getCurrentLoggedInUser();
        Set<Passenger> passengers = booking.getPassengers();
        booking.setVehicle(vehicle);
        booking.setUser(currentLoggedInUser);
        booking.setPassengers(passengers);
        for (Passenger passenger : passengers){
            passenger.setBooking(booking);
        }
        Booking newBooking = bookingRepository.save(booking);
        modifyVehicleCapacity(newBooking, "createBooking");
        modifyVehicleAvailability(booking);

        return newBooking;
    }


    @Transactional
    public int cancelBooking(int bookingId) {
        int currentUserId = applicationUserDetailsService.getCurrentLoggedInUser().getId();
        Optional<Booking> currentBookingOptional = bookingRepository.findByUserIdAndId(currentUserId,bookingId);
        boolean bookingPresent = currentBookingOptional.isPresent();
        if (!bookingPresent) throw new IllegalStateException("Couldn't find requested booking");
        Booking currentBooking = currentBookingOptional.get();
        modifyVehicleCapacity(currentBooking, "deleteBooking");
        modifyVehicleAvailability(currentBooking);
        bookingRepository.deleteById(bookingId);

        return bookingId;
    }

    @Transactional
    public Booking editBooking(int bookingId, Booking updatedBooking) {
        int currentUserId = applicationUserDetailsService.getCurrentLoggedInUser().getId();
        Optional<Booking> currentBookingOptional = bookingRepository.findByUserIdAndId(currentUserId,bookingId);
        boolean bookingPresent = currentBookingOptional.isPresent();
        if (!bookingPresent) throw new IllegalStateException("Couldn't find requested booking");
        Booking currentBooking = currentBookingOptional.get();
        currentBooking.setFromDate(updatedBooking.getFromDate());
        currentBooking.setToDate(updatedBooking.getToDate());
        bookingRepository.save(currentBooking);

        return currentBooking;
    }

    public void modifyVehicleCapacity(Booking booking, String operation){
        Vehicle vehicle = booking.getVehicle();
        int vehicleId = vehicle.getId();
        int vehicleCapacity = vehicle.getCapacity();
        int noOfPassengersInBooking = booking.getNumberOfPassenger();
        if (operation.equals("deleteBooking")){
            vehicle.setCapacity(vehicleCapacity + noOfPassengersInBooking);
        }
        else if(operation.equals("createBooking")){
            vehicle.setCapacity(vehicleCapacity - noOfPassengersInBooking);
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
