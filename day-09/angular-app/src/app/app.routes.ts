import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { FacilityListComponent } from './components/facility-list/facility-list';
import { FacilityDetailsComponent } from './components/facility-details/facility-details';
import { InspectionFormComponent } from './components/inspection-form/inspection-form';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'facilities',
    component: FacilityListComponent
  },

  {
    path: 'facilities/:id',
    component: FacilityDetailsComponent
  },

  {
    path: 'inspection',
    component: InspectionFormComponent
  }
];