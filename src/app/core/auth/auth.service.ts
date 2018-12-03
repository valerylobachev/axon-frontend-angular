import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store'
import {KeycloakService} from 'keycloak-angular'
import {ActionAuthLogin, ActionAuthLogout} from './auth.reducer'
import {from, Observable} from 'rxjs'

@Injectable()
export class AuthService {
  constructor(private keycloakService: KeycloakService, private store: Store<any>) {}

  loggedIn() {
    this.keycloakService.loadUserProfile().then(
        profile =>
            this.store.dispatch(new ActionAuthLogin(profile))
    ).catch(error => console.error(error))
  }

  loggedOut() {
    this.store.dispatch(new ActionAuthLogout());
  }

  logout() {
    this.keycloakService.logout().then( () => this.loggedOut())
  }

  profile() {
    this.keycloakService.getKeycloakInstance().accountManagement()
  }



  loadUserProfile(forceReload?: boolean): Observable<Keycloak.KeycloakProfile> {
    return from(this.keycloakService.loadUserProfile(forceReload))
  }



}

