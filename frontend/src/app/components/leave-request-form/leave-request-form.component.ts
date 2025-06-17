import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request.service';
import { CommonModule } from '@angular/common';
import { LeaveRequest } from '../../models/leave-request';

@Component({
  standalone: true,
  selector: 'app-leave-request-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent implements OnChanges {
  @Input() request: LeaveRequest | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  leaveForm: FormGroup;
  
  constructor(private fb: FormBuilder, private leaveRequestService: LeaveRequestService) {
    this.leaveForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['Pending']
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const formValue = this.leaveForm.value;
      
      // If editing an existing leave request (there is already an existing ID)
      if (this.request?.id) {
        this.leaveRequestService.updateLeaveRequest(this.request.id, formValue).subscribe({
          next: () => {
            alert('Leave request updated!');
            this.formSubmitted.emit();
            this.leaveForm.reset();
          },
          error: (err) => {
            console.error('Update failed', err);
            alert('Something went wrong, update failed');
          }
        })
      }
      // New request
      else {
        this.leaveRequestService.submitLeaveRequest(formValue).subscribe({
          next: () => {
            alert('Leave request submitted');
            this.formSubmitted.emit()
            this.leaveForm.reset();
          },
          error: (err) => {
            console.error('Submission failed', err);
            alert('Something went wrong');
          }
        });
      }
    }
  }

  onClose() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['request'] && this.request) {
      this.leaveForm.patchValue(this.request);
    }
  }
}
