/* eslint-disable no-use-before-define,max-len,react/sort-comp */
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, KeyboardAvoidingView, View, Button as Button2 } from 'react-native';
import { StackNavigator, TabBarBottom, TabBarTop, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/VehiclesComponents/VehiclesList';
import networkSettings from '../config/serverConnectionSettings';
import Vehicle from '../components/VehiclesComponents/Vehicle';
import SubscribedVehicle from '../components/VehiclesComponents/SubscribedVehicle';
import BorrowingVehicle from '../components/VehiclesComponents/BorrowingVehicle';
import ShareForm from '../components/VehiclesComponents/ShareForm';
import SubscribedList from '../components/VehiclesComponents/SubscribedList';
import DelegatedList from '../components/VehiclesComponents/DelegatedList';
import BorrowingList from '../components/VehiclesComponents/BorrowingList';
import theme from '../config/theme';


type Props = {
    navigation : any
};


class Vehicles extends Component<Props> {
  constructor(props) {
    super(props);

    this.getVehicleForm = this.getVehicleForm.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      userLoaded: false,
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
          this.setState({ user, userLoaded: true });
        });
    });
  }

  componentDidMount() {
    this.getUser();
  }


  getVehicleForm() {
    this.props.navigation.navigate('RegisterVehicleList', { url: `${networkSettings.homepage}/vehicles/${this.state.user.id}`, screen: 'Vehicle' });
  }

  render() {
    return (
      (this.state.userLoaded ?
        (
          <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
            <VehiclesTabNavigator />
            <Button2
              styles={{
                flexDirection: 'row',
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
              }}
              onPress={this.getVehicleForm}
              title="Subscribe New Vehicle"
            />
          </KeyboardAvoidingView>
        )
        :
        (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        )


      ));
  }
}

export default StackNavigator({
  List: {
    screen: Vehicles,
    navigationOptions: navigationHeaderStyle('Vehicles'),
  },
  RegisterVehicleList: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle('Your Vehicles'),
  },
  Vehicle: {
    screen: Vehicle,
    navigationOptions: navigationHeaderStyle('Vehicle'),
  },
  SubscribedVehicle: {
    screen: SubscribedVehicle,
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
});


const VehiclesTabNavigator = TabNavigator(
  {
    Subscribed: {
      screen: SubscribedList,
      navigationOptions: {
        tabBarLabel: 'Subscribed',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-swap" size={35} color={tintColor} />,
      },
    },
    Delegated: {
      screen: DelegatedList,
      navigationOptions: {
        tabBarLabel: 'Delegated',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-arrow-round-up" size={35} color={tintColor} />,
      },
    },
    Borrowed: {
      screen: BorrowingList,
      navigationOptions: {
        tabBarLabel: 'Borrowed',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-arrow-round-down" size={35} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: theme.main.backgroundColor,
      },
      indicatorStyle: {
        backgroundColor: 'gray',
      },
      activeTintColor: 'darkblue',
      inactiveTintColor: 'gray',


    },
    tabBarPosition: 'top',
    animationEnabled: true,
  },
);
