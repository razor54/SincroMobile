/* eslint-disable react/prop-types,react/prefer-stateless-function,no-undef */
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OneSignal from 'react-native-onesignal';
import Events from './screens/Events';
import Me from './screens/Me';
import About from './screens/About';
import Login from './components/Authentication/Login';
import SplashScreen from './SplashScreen';
import networkSetting from './config/serverConnectionSettings';
import NoConnectionScreen from './NoConnectionScreen';


type Props = {}
export default class extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderSplash = this.renderSplash.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.noInternet = this.noInternet.bind(this);

    this.state = {
      isLogin: false,
      functionToRender: this.renderSplash,
      user: {
        id: '',
        name: '',
        email: '',

      },
    };
  }


  componentWillMount() {

  }

  componentDidMount() {
    setTimeout(() => {
      fetch(networkSetting.homepage, { method: 'GET' })
        .then(res => (res.ok ?
          this.setState({ functionToRender: this.renderPage }) :
          this.setState({ functionToRender: this.noInternet })))
        .catch(this.setState({ functionToRender: this.noInternet }));
    }, 2500);

    OneSignal.init('75a88678-2deb-40be-8a8c-3b05309761b8');
    OneSignal.setSubscription(true);

    OneSignal.setLocationShared(true);
    OneSignal.inFocusDisplaying(2);
    OneSignal.setLogLevel(7, 0);

    OneSignal.getPermissionSubscriptionState((response) => {
      // console.warn('Received permission subscription state: ', response);
      // TODO save on storage and then when user
      // registers identification will be associated with him
      // AND if user is on another devce decide if it will be default device
      if (response.userId) { AsyncStorage.setItem('player_id', response.userId); }
    });


    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onLogin(user) {
    this.setState({ user: { id: user.id, name: user.name, email: user.email }, isLogin: true });
  }
  onReceived(notification) {
    console.warn('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.warn('Message: ', openResult.notification.payload.body);
    console.warn('Data: ', openResult.notification.payload.additionalData);
    console.warn('isActive: ', openResult.notification.isAppInFocus);
    console.warn('openResult: ', openResult);
  }

  onIds(device) {
    console.warn('Device info: ', device);
    AsyncStorage.get('player_id').then((value) => {
      if (value == null)AsyncStorage.setItem('player_id', device.userId);
    });
  }


  noInternet() {
    return (<NoConnectionScreen />);
  }

  renderSplash() {
    return (<SplashScreen />);
  }

  renderPage() {
    return (
      (this.state.isLogin) ?
        <Application screenProps={{ user: this.state.user }} /> :

        <Login screenProps={{ onLogin: this.onLogin }} />
    );
  }

  render() {
    return (this.state.functionToRender());
  }
}

const Application = TabNavigator(
  {

    Events: {
      screen: Events,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list" size={35} color={tintColor} />,
      },
    },


    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: 'Me',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-car" size={35} color={tintColor} />,
      },
    },

    About: {
      screen: About,
      navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-settings" size={35} color={tintColor} />,
      },
    },
  },
  {
    navigationOptions: (/* { navigation } */) => ({
    /*
             tabBarIcon: ({focused, tintColor}) => {
                 const {routeName} = navigation.state;
                 let iconName;
                 if (routeName === 'Home') {
                     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                 } else if (routeName === 'Settings') {
                     iconName = `ios-options${focused ? '' : '-outline'}`;
                 }

                 // You can return any component that you like here! We usually use an
                 // icon component from react-native-vector-icons
                 return <Ionicons name={iconName} size={25} color={tintColor}/>;
             }, */


    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);
