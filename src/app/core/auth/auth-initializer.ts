import {KeycloakService} from 'keycloak-angular'
import {AuthService} from '@app/core/auth/auth.service'

// TODO: move to separate file
export function initializer(keycloak: KeycloakService, authService: AuthService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: '/web-api/keycloak',
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: []
        });
        resolve();
        authService.loggedIn()
        console.log('initializer: login')
      } catch (error) {
        reject(error);
        authService.loggedOut()
        console.log('initializer: logout')
      }
    });
  };
}
