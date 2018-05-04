import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {YellowBox} from 'react-native';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


AppRegistry.registerComponent('App', () => App);
