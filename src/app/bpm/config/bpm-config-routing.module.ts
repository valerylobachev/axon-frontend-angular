import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './config/config.component'
import {AuthGuard} from '../../core/index'
import {SchemasComponent} from './schemas/schemas.component'
import {HomeComponent} from './home/home.component'
import {SchemaComponent} from './schema/schema.component'

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    data: { title: 'axon.bpm-config.title' },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'axon.bpm-config.schemas' },
        canActivate: [AuthGuard]
      },
      {
        path: 'schemas',
        component: SchemasComponent,
        data: { title: 'axon.bpm-config.schemas' },
        canActivate: [AuthGuard]
      },
      {
        path: 'schema/:action/:id',
        component: SchemaComponent,
        data: { title: 'axon.bpm-config.schemas' },
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmConfigRoutingModule { }
