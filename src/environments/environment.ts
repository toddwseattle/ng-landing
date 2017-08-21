// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { api_key } from '../../secrets/fireapikey';
export const environment = {
  production: false,
  firebase: {
    apiKey: api_key, // code depends on setting enviornment variable fire_api_key to the correct value
    authDomain: 'landingpage-1be8c.firebaseapp.com',
    databaseURL: 'https://landingpage-1be8c.firebaseio.com',
    projectId: 'landingpage-1be8c',
    storageBucket: 'landingpage-1be8c.appspot.com',
    messagingSenderId: '740699090284'
  }
};
