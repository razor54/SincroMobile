/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import { Text, Animated, AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';
import styles from './config/styles';
import networkSetting from './config/serverConnectionSettings';


type Props = {}
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
      user: null,
      error: false,
      networkError: false,

    };
    this.oneSignalStart = this.oneSignalStart.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.tryToken = this.tryToken.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      fetch(networkSetting.homepage, { method: 'GET' })
        .then((res) => {
          if (res.ok) {
            this.tryToken();
          } else {
            this.setState({ networkError: true });
          }
        })

        .catch(() => this.setState({ networkError: true }));
    }, 2000);

    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 2000, // Make it take a while
      },
    ).start(); // Starts the animation

    this.oneSignalStart();
  }

  componentDidUpdate() {
    if (this.state.networkError) {
      this.props.navigation.navigate('NoConnection');
    }
    if (this.state.error) {
      this.props.navigation.navigate('Auth');
    }

    if (this.state.user) {
      this.props.navigation.navigate('Application');
    }
  }

  // Push Notifications
  oneSignalStart() {
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
      if (response.userId) { AsyncStorage.setItem('playerId', response.userId); }
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

  onReceived(notification) {
    // console.warn('Notification received: ', notification);
  }

  onOpened(openResult) {
    /* console.warn('Message: ', openResult.notification.payload.body);
    console.warn('Data: ', openResult.notification.payload.additionalData);
    console.warn('isActive: ', openResult.notification.isAppInFocus);
    console.warn('openResult: ', openResult);
    */
  }

  onIds(device) {
    console.warn('Device info: ', device);
    AsyncStorage.getItem('playerId').then((value) => {
      if (value == null)AsyncStorage.setItem('playerId', device.userId);
    });
  }

  // Login
  onLogin() {
    this.navigation.navigate('Application');
  }


  tryToken() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const myInit = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };
        fetch(`${networkSetting.homepage}/validate`, myInit).then(res => res.json())
          .then((user) => {
            if (user.id) {
              this.setState({ user });
            } else {
              this.setState({ error: true });
            }
          })
          .catch(() => {
            this.setState({ error: true });
          });
      } else {
        this.setState({ error: true });
      }
    });
  }


  render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <Avatar
          source={require('../../public/image/sincro_logo.png')}
          xlarge
          title="Close"
          overlayContainerStyle={{ backgroundColor: 'transparent' }}
        />
        <Text style={styles.headerSplash}>
            Mobile
        </Text>
      </Animated.View>
    );
  }
}