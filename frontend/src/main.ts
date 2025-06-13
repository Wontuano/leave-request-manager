import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LeaveRequestTableComponent } from './app/components/leave-request-table.component';

bootstrapApplication(LeaveRequestTableComponent, appConfig)
  .catch((err) => console.error(err));
