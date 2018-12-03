import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {AuthGuard} from '../../core/index';
import {BpmComponent} from './bpm/bpm.component'
import {TasksComponent} from './tasks/tasks.component'
import {ProcessesComponent} from './processes/processes.component'

const routes: Routes = [
  {
    path: '',
    component: BpmComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      },
      {
        path: 'tasks',
        component: TasksComponent,
        data: { title: 'axon.bpm.menu.tasks' },
        canActivate: [AuthGuard]
      },
      {
        path: 'processes',
        component: ProcessesComponent,
        data: { title: 'axon.bpm.menu.processes' },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmRoutingModule {}
