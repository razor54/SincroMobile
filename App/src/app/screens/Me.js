/* eslint-disable no-use-before-define,max-len */
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/MeComponents/VehiclesList';
import RegisterVehicleForm from '../components/MeComponents/RegisterVehicleForm';
import UserInfo from '../components/MeComponents/UserInfo';
import VehicleElement from '../components/MeComponents/VehicleElement';
import ShareForm from '../components/MeComponents/ShareForm';
import networkSettings from '../config/serverConnectionSettings';


type Props = {
    screenProps: {
        user: {
            id: number,
            email: String,
            name: String,
        }
    },
    navigation : any
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);

    this.getMyVehicles = this.getMyVehicles.bind(this);
    this.getDelegatedVehicles = this.getDelegatedVehicles.bind(this);

    this.state = {
      user: props.screenProps.user,
    };
  }


  componentDidMount() {}


  getMyVehicles() {
    this.props.navigation.navigate('VehiclesList', { url: `${networkSettings.homepage}/vehicles/${this.state.user.id}`, screen: 'VehicleElement' });
  }

  getDelegatedVehicles() {
    this.props.navigation.navigate('DelegatedVehicles', { url: `${networkSettings.homepage}/vehicles/delegated/${this.state.user.id}`, screen: 'VehicleElement' });
  }

  render() {
    return (
      <View style={{ justifyContent: 'flex-end' }}>
        <UserInfo user={this.state.user} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Text style={styles.header_left}> Your Vehicles </Text>
          <RegisterVehicleForm user={this.state.user} />
        </View>
        <Button onPress={this.getMyVehicles} title="My Vehicles" />
        <Button onPress={this.getDelegatedVehicles} title="Delegated Vehicles" />
      </View>
    );
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
  VehicleElement: {
    screen: VehicleElement,
    navigationOptions: navigationHeaderStyle('Vehicle Details'),
  },
  Share: {
    screen: ShareForm,
    navigationOptions: navigationHeaderStyle('Share Vehicle'),
  },


});

