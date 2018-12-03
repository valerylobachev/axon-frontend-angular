import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {ofAction} from 'ngrx-actions';
import {Actions, Effect, ofType} from '@ngrx/effects'
import {SchemaBackendService} from '@app/bpm/shared/services/schema-backend.service'
import {catchError, map, switchMap} from 'rxjs/operators'
import {
  CreateSchema, CreateSchemaFailure, CreateSchemaSuccess,
  DeleteSchema, DeleteSchemaFailure,
  DeleteSchemaSuccess,
  FindSchemas,
  FindSchemasFailure,
  FindSchemasSuccess,
  SchemaActionTypes, UpdateSchema, UpdateSchemaFailure, UpdateSchemaSuccess
} from './schema.actions'
import {of} from 'rxjs'


@Injectable()
export class SchemaEffects {
  constructor(
      private store: Store<any>,
      private update$: Actions,
      private schemaBackend: SchemaBackendService) {
  }

  @Effect()
  findShemas$ = this.update$.pipe(
      ofType<FindSchemas>(SchemaActionTypes.FindSchemas),
      switchMap(action =>
          this.schemaBackend
              .find(action.payload.filter)
              .pipe(
                  map(response => new FindSchemasSuccess({schemas: response})),
                  catchError(failure =>
                      of(new FindSchemasFailure({failure: failure.error}))
                  )
              )
      )
  )

  @Effect()
  deleteShemas$ = this.update$.pipe(
      ofType<DeleteSchema>(SchemaActionTypes.DeleteSchema),
      switchMap(action =>
          this.schemaBackend
              .delete(action.payload.id)
              .pipe(
                  map(response => new DeleteSchemaSuccess({id: action.payload.id})),
                  catchError(failure =>
                      of(new DeleteSchemaFailure({failure: failure}))
                  )
              )
      )
  )

  @Effect()
  createShemas$ = this.update$.pipe(
      ofType<CreateSchema>(SchemaActionTypes.CreateSchema),
      switchMap(action =>
          this.schemaBackend
              .create(action.payload.schema)
              .pipe(
                  map(response =>
                      new CreateSchemaSuccess({
                        schema: {
                          id: response.id,
                          name: response.name,
                          description: response.description,
                          notation: response.notation
                        }
                      })
                  ),
                  catchError(failure =>
                      of(new CreateSchemaFailure({failure: failure}))
                  )
              )
      )
  )

  @Effect()
  updateShemas$ = this.update$.pipe(
      ofType<UpdateSchema>(SchemaActionTypes.UpdateSchema),
      switchMap(action =>
          this.schemaBackend
              .update(action.payload.update.changes.schema)
              .pipe(
                  map(response =>
                      new UpdateSchemaSuccess({
                        update: {
                          id: response.id,
                          changes: {
                            id: response.id,
                            name: response.name,
                            description: response.description,
                            notation: response.notation
                          }
                        }
                      })
                  ),
                  catchError(failure =>
                      of(new UpdateSchemaFailure({failure: failure}))
                  )
              )
      )
  )

}