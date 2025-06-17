import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LeaveRequestRootComponent } from './app/components/leave-request-root/leave-request-root.components';

bootstrapApplication(LeaveRequestRootComponent, appConfig)
  .catch((err) => console.error(err));