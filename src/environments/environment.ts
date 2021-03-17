// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FIREBASE: {
    apiKey: 'AIzaSyC_Krq9vXDZgM1XjnDZyQVm5o7AaxsU3Qo',
    authDomain: 'notepad-e12eb.firebaseapp.com',
    projectId: 'notepad-e12eb',
    storageBucket: 'notepad-e12eb.appspot.com',
    messagingSenderId: '685232889645',
    appId: '1:685232889645:web:7bc57e1fce2d7c08d8fda4',
    measurementId: 'G-03FD0XVG34'
  },
  WEATHER_API: {
    key: '99f0c42a193beb6881706566f41ab96b',
    baseUrl: 'https://api.openweathermap.org'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
