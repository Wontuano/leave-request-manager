import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-leave-request-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.scss'
})
export class LeaveRequestFormComponent {
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  leaveForm: FormGroup;
  
  constructor(private fb: FormBuilder, private leaveRequestService: LeaveRequestService) {
    this.leaveForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const request = {
        ...this.leaveForm.value,
        status: 'Pending'
      }
      this.leaveRequestService.submitLeaveRequest(request).subscribe({
        next: () => {
          alert('Leave request successfully submitted!');
          this.leaveForm.reset(); // clear the form after submitting
          this.formSubmitted.emit(); // Notify parent to close the modal
        },
        error: (err) => {
          console.error('Submission failed', err)
          alert('Something went wrong, please try again');
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
