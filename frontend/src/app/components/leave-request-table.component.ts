import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
          <td>
            <div class="button-row">
              <button (click)="editRequest(request)">Edit</button>
              <button (click)="deleteRequest(request.id!)">Delete</button>
            </div>
          </td>
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
    .button-row {
      display: flex;
      gap: 20px;
    }
  `],
  providers: [LeaveRequestService]
})
export class LeaveRequestTableComponent implements OnInit {
  @Output() edit = new EventEmitter<LeaveRequest>();
  
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
      this.leaveRequestService.getLeaveRequests().subscribe({
        next: (data) => this.leaveRequests = data,
        error: (err) => console.error('Error fetching leave requests', err)
      });
  }

  editRequest(request: LeaveRequest) {
    this.edit.emit(request);
  }

  deleteRequest(id: number) {
    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveRequestService.deleteLeaveRequest(id).subscribe({
        next: () => {
          this.leaveRequests = this.leaveRequests.filter(req => req.id !== id);
        },
        error: (err)=> {
          console.error('Delete failed', err);
          alert('Could not delete the request')
        }
      });
    }
  }
}
