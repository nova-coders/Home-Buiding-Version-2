import { Route } from '@angular/router';

import { LogInComponent } from './log-in.component';

export const loginRoute: Route = {
  path: 'log-in',
  component: LogInComponent,
  data: {
    authorities: [],
    pageTitle: 'activate.title',
  },
};
