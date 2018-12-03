import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'axon.admin.menu.admin' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
