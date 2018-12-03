import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrgStructureComponent} from './org-structure.component'

const routes: Routes = [
  {
    path: '',
    component: OrgStructureComponent,
    data: { title: 'axon.org-structure.menu.org-structure' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgStructureRoutingModule {}
