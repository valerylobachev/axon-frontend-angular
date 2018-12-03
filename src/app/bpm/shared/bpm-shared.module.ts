import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SchemaBackendService} from './services/schema-backend.service';
import {Store, StoreModule} from '@ngrx/store';
import * as fromSchema from './services/schema.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SchemaEffects} from '@app/bpm/shared/services/schema.effects';
import {FindSchemas} from '@app/bpm/shared/services/schema.actions';




@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('schema', fromSchema.reducer),
    EffectsModule.forFeature([SchemaEffects]),

  ],
  declarations: [],
  providers: [
    SchemaBackendService
  ],
  exports: [
  ]
})
export class BpmSharedModule {
  constructor(store: Store<any>) {
    store.dispatch(new FindSchemas({ filter: '' }));

  }
}
