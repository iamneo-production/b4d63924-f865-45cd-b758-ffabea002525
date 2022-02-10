package com.examly.springapp.controller;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.entity.Passenger;
import com.examly.springapp.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping(path = "/user/booking")
    public List<Booking> getAllBooking(){
        return bookingService.getAllBooking();
    }

    @PostMapping(path = "/user/booking/{vehicleId}")
    public Booking createBooking(@PathVariable int vehicleId, @RequestBody Booking booking, @RequestBody List<Passenger> listOfPassenger){
        return bookingService.createBooking(vehicleId,booking,listOfPassenger);
    }

    @DeleteMapping(path = "/user/deleteBooking/{bookingId}")
    public int cancelBooking(@PathVariable int bookingId){
        return bookingService.cancelBooking(bookingId);
    }

    @PutMapping(path = "/user/editBooking/{bookingId}")
    public Booking editBooking(@PathVariable int bookingId, @RequestBody Booking updatedBooking){
        return bookingService.editBooking(bookingId, updatedBooking);
    }

}
