import { AppRegistry, YellowBox } from 'react-native';
import App from './src/app/App';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule was not exported. Did you forget to use RCT_EXPORT_MODULE()?']);

AppRegistry.registerComponent('App', () => App);
