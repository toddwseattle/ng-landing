import { api_key } from '../../secrets/fireapikey';
export const environment = {
  production: true,
  firebase: {
    apiKey: api_key, // code depends on setting enviornment variable fire_api_key to the correct value
    authDomain: 'landingpage-1be8c.firebaseapp.com',
    databaseURL: 'https://landingpage-1be8c.firebaseio.com',
    projectId: 'landingpage-1be8c',
    storageBucket: 'landingpage-1be8c.appspot.com',
    messagingSenderId: '740699090284'
  }
};
