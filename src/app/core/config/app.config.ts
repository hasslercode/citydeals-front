import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from '../../app.routes';
import { apiErrorInterceptor } from '../interceptors/api-error.interceptor';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
  ],
};
