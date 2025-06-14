import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave-request';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  // GET all leave requests
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  // POST a new leave request
  submitLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, request)
  }

}
