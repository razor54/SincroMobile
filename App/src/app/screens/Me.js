/* eslint-disable no-use-before-define,max-len,react/sort-comp */
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/OptionsComponents/Vehicles/VehiclesList';
import RegisterVehicleForm from '../components/MeComponents/RegisterVehicleForm';
import UserInfo from '../components/MeComponents/UserInfo';
import networkSettings from '../config/serverConnectionSettings';
import BorrowingRequest from '../components/MeComponents/Requests/BorrowingRequest';


type Props = {
    navigation : any
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);

    this.getBorrowingRequests = this.getBorrowingRequests.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getVehicleForm = this.getVehicleForm.bind(this);

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

  getBorrowingRequests() {
    this.props.navigation.navigate('BorrowingRequests', { url: `${networkSettings.homepage}/vehicles/borrow/${this.state.user.id}/requests`, screen: 'BorrowingRequestElement' });
  }
  getVehicleForm() {
    this.props.navigation.navigate('RegisterVehicleForm', { user: this.state.user });
  }

  render() {
    return (
      (this.state.user ?
        (
          <View style={{ justifyContent: 'flex-end' }}>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <UserInfo user={this.state.user} />

              <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <View style={{ padding: 5 }}>
                  <Button
                    buttonStyle={styles.button2}
                    title="Requests"
                    onPress={this.getBorrowingRequests}
                  />
                </View>
                <View style={{ padding: 5 }}>
                  <Button
                    buttonStyle={styles.button2}
                    title="Add Vehicle"
                    onPress={this.getVehicleForm}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Text style={styles.header_left}> Recent Activity </Text>
            </View>

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
  BorrowingRequests: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Requests'),
  },
  BorrowingRequestElement: {
    screen: BorrowingRequest,
    navigationOptions: navigationHeaderStyle('Borrowing Request Element'),
  },
  RegisterVehicleForm: {
    screen: RegisterVehicleForm,
    navigationOptions: navigationHeaderStyle('Register Vehicle'),
  },

});

