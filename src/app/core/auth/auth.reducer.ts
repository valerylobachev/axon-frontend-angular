import { Action } from '@ngrx/store';

export const AUTH_KEY = 'AUTH';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout'
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(readonly payload: Keycloak.KeycloakProfile) {}
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = ActionAuthLogin | ActionAuthLogout;

export const initialState: AuthState = {
  isAuthenticated: false,
  profile: null
};

export const selectorAuth = state => state.auth;

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true, profile: action.payload };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, profile: null };

    default:
      return state;
  }
}

export interface AuthState {
  isAuthenticated: boolean;
  profile: Keycloak.KeycloakProfile
}
