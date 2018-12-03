import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Schema } from './schema.model';
import { SchemaActions, SchemaActionTypes } from './schema.actions';
import {SchemaSummary} from '@app/bpm/shared/services/model';
import {createFeatureSelector} from '@ngrx/store';

export interface State extends EntityState<SchemaSummary> {
  // additional entities state properties
  filter: string;
  loading: boolean;
  loadingFailure: any;
  saving: boolean;
  savingFailure: any;
}

export function sortByName(a: SchemaSummary, b: SchemaSummary): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<SchemaSummary> = createEntityAdapter<SchemaSummary>({
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  filter: '',
  loading: false,
  loadingFailure: null,
  saving: false,
  savingFailure: null
});

export function reducer(
  state = initialState,
  action: SchemaActions
): State {
  switch (action.type) {
    case SchemaActionTypes.CreateSchema: {
      return {...state, saving: true, savingFailure: null};
    }

    case SchemaActionTypes.CreateSchemaSuccess: {
      return adapter.addOne(action.payload.schema, state);
    }

    case SchemaActionTypes.CreateSchemaFailure: {
      return {...state, saving: false, savingFailure: action.payload.failure};
    }

    case SchemaActionTypes.UpdateSchema: {
      return {...state, saving: true, savingFailure: null};
    }

    case SchemaActionTypes.UpdateSchemaSuccess: {
      return adapter.updateOne(action.payload.update, state);
    }

    case SchemaActionTypes.DeleteSchema: {
      return {...state, saving: true, savingFailure: null};
    }

    case SchemaActionTypes.DeleteSchemaSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case SchemaActionTypes.FindSchemas: {
      return {...state, loading: true, filter: action.payload.filter};
    }

    case SchemaActionTypes.FindSchemasSuccess: {
      const state1 = adapter.addAll(action.payload.schemas, state);
      return {...state1, loading: false};
    }

    case SchemaActionTypes.FindSchemasFailure: {
      const state1 = adapter.removeAll(state);
      return {...state1, loadingFailure: action.payload.failure, loading: false};
    }


    default: {
      return state;
    }
  }
}

export const selectSchemaState = createFeatureSelector<State>('schema');


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectSchemaState);

export const selectFilter = state => state.schema.filter;
export const selectLoadingFailure = state => state.schema.loadingFailure;
export const selectSavingFailure = state => state.schema.savingFailure;
