import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Avatar, Button, Text } from 'react-native-elements';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Button as Button2,
} from 'react-native';
import styles from '../config/styles';
import networkSettings from '../config/serverConnectionSettings';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/OptionsComponents/Vehicles/VehiclesList';
import VehicleElement from '../components/OptionsComponents/Vehicles/VehicleElement';
import BorrowingVehicle from '../components/OptionsComponents/Vehicles/BorrowingVehicle';
import ShareForm from '../components/OptionsComponents/Vehicles/ShareForm';
import About from '../components/OptionsComponents/About';

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
  size: 30,
};


class Options extends Component<Props> {
  constructor(props) {
    super(props);

    this.getMyVehicles = this.getMyVehicles.bind(this);
    this.getDelegatedVehicles = this.getDelegatedVehicles.bind(this);
    this.getBorrowingVehicles = this.getBorrowingVehicles.bind(this);
    this.showAlertDecision = this.showAlertDecision.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
    this.gotToAbout = this.gotToAbout.bind(this);


    this.state = {
      user: {
        name: '',
        id: '',
        email: '',
      },
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) {
        console.warn('null token');
        // TODO return to login
        throw Error('No token');
      }
      return JSON.parse(token);
    }).then((token) => {
      const myInit = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      };
      fetch(`${networkSettings.homepage}/validate`, myInit).then(res => res.json())
        .then((user) => {
          if (user.id) {
            this.setState({ user });
          }
        });
    });
  }


  getMyVehicles() {
    this.props.navigation.navigate('VehiclesList', { url: `${networkSettings.homepage}/vehicles/${this.state.user.id}`, screen: 'VehicleElement' });
  }

  getDelegatedVehicles() {
    this.props.navigation.navigate('DelegatedVehicles', { url: `${networkSettings.homepage}/vehicles/delegated/${this.state.user.id}`, screen: 'VehicleElement' });
  }

  getBorrowingVehicles() {
    this.props.navigation.navigate('BorrowingVehicles', { url: `${networkSettings.homepage}/vehicles/borrowing/${this.state.user.id}`, screen: 'BorrowingVehicle' });
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

  gotToAbout() {
    this.props.navigation.navigate('About');
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

        <View style={styles.userIcon}>

          <Avatar
            source={this.state.userImage ? { uri: this.state.userImage } : require('../../../public/image/user_icon.png')}
            title="MI"
            large
            overlayContainerStyle={{ backgroundColor: 'transparent' }}
            onPress={this.showMoreInfo}
            activeOpacity={2}
          />
        </View>

        <Text style={styles.btnText}>{this.state.user.name}</Text>
        <Text style={styles.btnText}>{this.state.user.id} </Text>
        <Text style={{ ...styles.btnText }}>{this.state.user.email}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', padding: 5 }}>
          <Button buttonStyle={styles.button2} rounded onPress={this.getMyVehicles} title="My Vehicles" />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', padding: 5 }}>
          <Button buttonStyle={styles.button2} rounded onPress={this.getDelegatedVehicles} title="Delegated Vehicles" />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', padding: 5 }}>
          <Button buttonStyle={styles.button2} rounded onPress={this.getBorrowingVehicles} title="Borrowing Vehicles" />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingTop: 20 }}>
          <Button buttonStyle={styles.button2} rounded onPress={this.gotToAbout} title="About Us" />
        </View>

        <Button2
          title="Logout"
          onPress={this.showAlertDecision}
        />

        <View />

      </KeyboardAvoidingView>

    );
  }
}


export default StackNavigator({
  Options: {
    screen: Options,
    navigationOptions: navigationHeaderStyle('Options'),
  },
  VehiclesList: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Vehicles'),
  },
  DelegatedVehicles: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Delegated'),
  },
  BorrowingVehicles: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Borrowing'),
  },
  VehicleElement: {
    screen: VehicleElement,
    navigationOptions: navigationHeaderStyle('Vehicle'),
  },
  BorrowingVehicle: {
    screen: BorrowingVehicle,
    navigationOptions: navigationHeaderStyle('Vehicle'),
  },
  Share: {
    screen: ShareForm,
    navigationOptions: navigationHeaderStyle('Share'),
  },
  About: {
    screen: About,
    navigationOptions: navigationHeaderStyle('About'),
  },

});

