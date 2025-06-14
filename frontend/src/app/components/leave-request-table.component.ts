import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequest } from '../models/leave-request';
import { LeaveRequestService } from '../services/leave-request.service';

@Component({
  standalone: true,
  selector: 'app-leave-request-table',
  imports: [CommonModule],
  template: `
    <h1>
      Leave Requests
    </h1>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Leave Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let request of leaveRequests">
          <td>{{ request.firstName }}</td>
          <td>{{ request.lastName }}</td>
          <td>{{ request.leaveType }}</td>
          <td>{{ request.startDate }}</td>
          <td>{{ request.endDate }}</td>
          <td>{{ request.status }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      border: 1px solid black;
    }
  `],
  providers: [LeaveRequestService]
})
export class LeaveRequestTableComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
      this.leaveRequestService.getLeaveRequests().subscribe({
        next: (data) => this.leaveRequests = data,
        error: (err) => console.error('Error fetching leave requests', err)
      });
  }
}
