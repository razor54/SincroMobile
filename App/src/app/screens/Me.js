/* eslint-disable no-use-before-define,max-len,react/sort-comp */
import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, Text, View} from 'react-native';
import { Button } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/MeComponents/Vehicles/VehiclesList';
import RegisterVehicleForm from '../components/MeComponents/Vehicles/RegisterVehicleForm';
import UserInfo from '../components/MeComponents/UserInfo';
import VehicleElement from '../components/MeComponents/Vehicles/VehicleElement';
import BorrowingVehicle from '../components/MeComponents/Vehicles/Share/BorrowingVehicle';
import ShareForm from '../components/MeComponents/Vehicles/Share/ShareForm';
import networkSettings from '../config/serverConnectionSettings';
import BorrowingRequest from '../components/MeComponents/Vehicles/Share/BorrowingRequest';


type Props = {
    navigation : any
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);

    this.getMyVehicles = this.getMyVehicles.bind(this);
    this.getDelegatedVehicles = this.getDelegatedVehicles.bind(this);
    this.getBorrowingVehicles = this.getBorrowingVehicles.bind(this);
    this.getBorrowingRequests = this.getBorrowingRequests.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      user: null,
    };
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

  componentDidMount() {
    this.getUser();
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

  getBorrowingRequests() {
    this.props.navigation.navigate('BorrowingRequests', { url: `${networkSettings.homepage}/vehicles/borrow/${this.state.user.id}/requests`, screen: 'BorrowingRequestElement' });
  }


  render() {
    return (
      (this.state.user ?
        (
          <View style={{ justifyContent: 'flex-end' }}>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <UserInfo user={this.state.user} />

              <Button
                color="black"
                small
                outline
                rounded
                title="10"
                onPress={this.getBorrowingRequests}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Text style={styles.header_left}> Your Vehicles </Text>
              <RegisterVehicleForm user={this.state.user} />
            </View>
            <Button onPress={this.getMyVehicles} title="My Vehicles" />
            <Button onPress={this.getDelegatedVehicles} title="Delegated Vehicles" />
            <Button onPress={this.getBorrowingVehicles} title="Borrowing Vehicles" />
          </View>
        )
        :
        (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )


      ));
  }
}

export default StackNavigator({
  List: {
    screen: Profile,
    navigationOptions: navigationHeaderStyle('Profile'),
  },
  VehiclesList: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('My Vehicles'),
  },
  DelegatedVehicles: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Delegated Vehicles'),
  },
  BorrowingVehicles: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Borrowing Vehicles'),
  },
  BorrowingRequests: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Borrowing Requests'),
  },
  BorrowingRequestElement: {
    screen: BorrowingRequest,
    navigationOptions: navigationHeaderStyle('Borrowing Request Element'),
  },
  VehicleElement: {
    screen: VehicleElement,
    navigationOptions: navigationHeaderStyle('Vehicle Details'),
  },
  BorrowingVehicle: {
    screen: BorrowingVehicle,
    navigationOptions: navigationHeaderStyle('Vehicle Details'),
  },
  Share: {
    screen: ShareForm,
    navigationOptions: navigationHeaderStyle('Share Vehicle'),
  },


});

