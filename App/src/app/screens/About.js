import React, { Component } from 'react';

import { Avatar, Button } from 'react-native-elements';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
} from 'react-native';
import styles from '../config/styles';

type Props = {
    screenProps: {
        isLogin: boolean
    },
  navigation:{
    navigate: any,
  }
};

const buttonIcon = {
  name: 'ios-log-out',
  type: 'ionicon',
  color: 'black',
  size: 50,
};


export default class extends Component<Props> {
  constructor(props) {
    super(props);

    this.showAlertDecision = this.showAlertDecision.bind(this);
    this.logout = this.logout.bind(this);


    this.state = {
    };
  }

  showAlertDecision() {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.logout() },
        { text: 'Cancel', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

        <View style={styles.container}>
          <Avatar
            source={require('../../../public/image/sincro_logo_black.png')}
            xlarge
            title="Close"
            overlayContainerStyle={{ backgroundColor: 'transparent' }}
          />
          <Text style={styles.header}>
                Mobile
          </Text>


          <Text style={styles.header_left}>
                        Developed by
          </Text>
          <Text style={styles.textCenter}>
                        André Gaudêncio
          </Text>
          <Text style={styles.textCenter}>
                        &
          </Text>
          <Text style={styles.textCenter}>
                        Nuno Conceição
          </Text>

        </View>
        <View style={styles.logoutButton}>
          <Button
            transparent
            icon={buttonIcon}
            onPress={this.showAlertDecision}

          />
        </View>


      </KeyboardAvoidingView>

    );
  }
}
