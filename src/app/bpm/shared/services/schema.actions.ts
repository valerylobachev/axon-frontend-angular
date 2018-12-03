import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {Schema, SchemaSummary} from './model';

export enum SchemaActionTypes {
  FindSchemas = '[Schema] Find Schemas',
  FindSchemasSuccess = '[Schema] Find Schemas Success',
  FindSchemasFailure = '[Schema] Find Schemas Failure',

  CreateSchema = '[Schema] Create Schema',
  CreateSchemaSuccess = '[Schema] Create Schema Success',
  CreateSchemaFailure = '[Schema] Create Schema Failure',

  UpdateSchema = '[Schema] Update Schema',
  UpdateSchemaSuccess = '[Schema] Update Schema Success',
  UpdateSchemaFailure = '[Schema] Update Schema Failure',

  DeleteSchema = '[Schema] Delete Schema',
  DeleteSchemaSuccess = '[Schema] Delete Schema Success',
  DeleteSchemaFailure = '[Schema] Delete Schema Failure',
}

export class FindSchemas implements Action {
  readonly type = SchemaActionTypes.FindSchemas;

  constructor(public payload: { filter: string }) {}
}

export class FindSchemasSuccess implements Action {
  readonly type = SchemaActionTypes.FindSchemasSuccess;

  constructor(public payload: { schemas: SchemaSummary[] }) {}
}

export class FindSchemasFailure implements Action {
  readonly type = SchemaActionTypes.FindSchemasFailure;

  constructor(public payload: { failure: any }) {}
}

export class CreateSchema implements Action {
  readonly type = SchemaActionTypes.CreateSchema;

  constructor(public payload: { schema: string }) {}
}

export class CreateSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.CreateSchemaSuccess;

  constructor(public payload: { schema: SchemaSummary }) {}
}

export class CreateSchemaFailure implements Action {
  readonly type = SchemaActionTypes.CreateSchemaFailure;

  constructor(public payload: { failure: any }) {}
}


export class UpdateSchema implements Action {
  readonly type = SchemaActionTypes.UpdateSchema;

  constructor(public payload: { update: Update<Schema> }) {}
}

export class UpdateSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.UpdateSchemaSuccess;

  constructor(public payload: { update: Update<SchemaSummary> }) {}
}
export class UpdateSchemaFailure implements Action {
  readonly type = SchemaActionTypes.UpdateSchemaFailure;

  constructor(public payload: { failure: any }) {}
}

export class DeleteSchema implements Action {
  readonly type = SchemaActionTypes.DeleteSchema;

  constructor(public payload: { id: string }) {}
}

export class DeleteSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.DeleteSchemaSuccess;

  constructor(public payload: { id: string }) {}
}
export class DeleteSchemaFailure implements Action {
  readonly type = SchemaActionTypes.DeleteSchemaFailure;

  constructor(public payload: { failure: any }) {}
}


export type SchemaActions =
 FindSchemas
 | FindSchemasSuccess
 | FindSchemasFailure
 | CreateSchema
 | CreateSchemaSuccess
 | CreateSchemaFailure
 | UpdateSchema
 | UpdateSchemaSuccess
 | UpdateSchemaFailure
 | DeleteSchema
 | DeleteSchemaSuccess
 | DeleteSchemaFailure;
