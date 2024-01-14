import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TaskService } from './task/task.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), TaskService]
};
