package com.example.demo.controller;

import com.example.demo.model.LeaveRequest;
import com.example.demo.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200") // allow Angular frontend to access backend
public class LeaveRequestController {
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    // GET all leave requests
    @GetMapping
    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }

    // GET a specific request by ID
    @GetMapping("/{id}")
    public Optional<LeaveRequest> getRequestById(@PathVariable Long id) {
        return leaveRequestRepository.findById(id);
    }

    // POST a new leave request
    @PostMapping
    public LeaveRequest createRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

}
