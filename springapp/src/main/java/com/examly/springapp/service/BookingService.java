package com.examly.springapp.service;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.entity.Passenger;
import com.examly.springapp.entity.Vehicle;
import com.examly.springapp.repository.BookingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final PassengerService passengerService;
    private final VehicleService vehicleService;

    public List<Booking> getAllBooking() {
        //TODO: first we have to fetch current logged in user id then we have to fetch all booking of that user
        int currentUserId = 1;
        return bookingRepository.findByUserId(currentUserId);
    }

    @Transactional
    public Booking createBooking(int vehicleId, Booking booking, List<Passenger> listOfPassenger){
        //TODO: at first we have to check this valid vehicle or not and vehicle is available or not
        Optional<Vehicle> vehicleOptional = vehicleService.findById(vehicleId);
        if (vehicleOptional.isEmpty()) throw new IllegalStateException("this vehicle id is not present");
        Vehicle vehicle = vehicleOptional.get();
        if (!vehicle.getAvailableStatus().equalsIgnoreCase("Available")) throw new IllegalStateException("this vehicle is not available to book");

        //TODO: vehicle sit is available or not we have to check
        if (booking.getNumberOfPassanger() != listOfPassenger.size()) throw new IllegalStateException("number of passenger and list of passenger is not matched");

        //TODO: first we have to fetch current logged in user then we can create booking
        int currentUserId = 1;
        booking.setVehicle(vehicle);
        //booking.setUser();
        Booking newBooking = bookingRepository.save(booking);

        for (Passenger passenger : listOfPassenger){
            passenger.setBooking(newBooking);
            passengerService.save(passenger);
        }

        return newBooking;
    }


    @Transactional
    public int cancelBooking(int bookingId) {
        //TODO: first we have to fetch current logged in user id then we have to fetch the particular booking of that user
        int currentUserId = 1;

        boolean bookingPresent = bookingRepository.findByUserIdAndId(currentUserId, bookingId).isPresent();
        if (!bookingPresent) throw new IllegalStateException("Couldn't found booking");

        //TODO: we need to delete all passenger from the passenger table then we can delete our booking
        passengerService.deleteAllPassengerByBookingId(bookingId);

        //TODO: have to modify available vehicle sit

        //TODO: we can delete booking
        bookingRepository.deleteById(bookingId);

        return bookingId;

    }

    @Transactional
    public Booking editBooking(int bookingId, Booking updatedBooking) {
        //TODO: first we have to fetch current logged in user id then we have to fetch the particular booking of that user
        int currentUserId = 1;

        Booking booking = bookingRepository.findByUserIdAndId(currentUserId, bookingId).orElse(null);
        if (booking == null) throw new IllegalStateException("Couldn't found booking");

        // we only give the permission to change from date and get date
        booking.setFromDate(updatedBooking.getFromDate());
        booking.setToDate(updatedBooking.getToDate());

        bookingRepository.save(booking);

        return booking;
    }


}
