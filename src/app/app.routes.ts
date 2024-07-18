import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
];
