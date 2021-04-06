/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/App';
// import App from './src2/App';
// import App from './src3/App';
// import App from './src4/App';
// import App from './src5/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
