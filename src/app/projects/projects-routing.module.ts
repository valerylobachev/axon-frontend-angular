import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {AuthGuard} from '@app/core';
import {ProjectsComponent} from './projects/projects.component'
import {ProjectDashboardComponent} from './project-dashboard/project-dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: ProjectDashboardComponent,
        data: { title: 'axon.projects.menu.dashboard' },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
