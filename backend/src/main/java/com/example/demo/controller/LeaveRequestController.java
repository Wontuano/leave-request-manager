package com.example.demo.controller;

import com.example.demo.model.LeaveRequest;
import com.example.demo.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200") // allow Angular frontend to access backend
public class LeaveRequestController {
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    // Get all leave requests
    @GetMapping
    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }

    // Get a specific request by ID
    @GetMapping("/{id}")
    public Optional<LeaveRequest> getRequestById(@PathVariable Long id) {
        return leaveRequestRepository.findById(id);
    }

    // Post a new leave request
    @PostMapping
    public LeaveRequest createRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    // Update an existing leave request
    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequest> updateLeaveRequest(@PathVariable Long id, @RequestBody LeaveRequest updatedRequest) {
        Optional<LeaveRequest> existing = leaveRequestRepository.findById(id);
        if (existing.isPresent()) {
            LeaveRequest request = existing.get();
            request.setFirstName(updatedRequest.getFirstName());
            request.setLastName(updatedRequest.getLastName());
            request.setLeaveType(updatedRequest.getLeaveType());
            request.setStartDate(updatedRequest.getStartDate());
            request.setEndDate(updatedRequest.getEndDate());
            request.setStatus(updatedRequest.getStatus());
            leaveRequestRepository.save(request);
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an existing leave request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable Long id) {
        if (leaveRequestRepository.existsById(id)) {
            leaveRequestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
