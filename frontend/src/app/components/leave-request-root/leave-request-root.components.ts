import { Component } from '@angular/core';
import { LeaveRequestFormComponent } from '../leave-request-form/leave-request-form.component';
import { LeaveRequestTableComponent } from '../leave-request-table.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-leave-request-root',
  imports: [LeaveRequestFormComponent, LeaveRequestTableComponent, NgIf],
  template: `
    <h1>Leave Request Manager</h1>
    <button (click)="showForm = true">+ New Leave Request</button>

    <div class="modal-backdrop" *ngIf="showForm">
      <div class="modal">
        <app-leave-request-form 
          (formSubmitted)="onFormSubmitted()" 
          (close)="showForm = false">
        </app-leave-request-form>
      </div>
    </div>
        
    <hr />
    <app-leave-request-table></app-leave-request-table>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
    }
  `]
})
export class LeaveRequestRootComponent {
  showForm = false;

  onFormSubmitted() {
    this.showForm = false;
  }
}
