/* eslint-disable react/prop-types,react/prefer-stateless-function,no-undef,max-len */
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, KeyboardAvoidingView, View, Button as Button2 } from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/VehiclesComponents/VehiclesList';
import Vehicle from '../components/VehiclesComponents/Vehicle';
import SubscribedVehicle from '../components/VehiclesComponents/SubscribedVehicle';
import BorrowingVehicle from '../components/VehiclesComponents/BorrowingVehicle';
import ShareForm from '../components/VehiclesComponents/ShareForm';
import SubscribedList from '../components/VehiclesComponents/SubscribedList';
import DelegatedList from '../components/VehiclesComponents/DelegatedList';
import BorrowingList from '../components/VehiclesComponents/BorrowingList';
import theme from '../config/theme';
import { getUser } from '../service/userService';
import languages from '../config/languages';


type Props = {
    navigation : any
};


class Vehicles extends Component<Props> {
  constructor(props) {
    super(props);

    this.getVehicleForm = this.getVehicleForm.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      userLoaded: false,
      user: null,
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('user').then(JSON.parse).then((user) => {
      if (!user.id) throw Error('No valid user');
      this.setState({ user, userLoaded: true });
    }).catch(this.loadUser);
  }

  getVehicleForm() {
    this.props.navigation.navigate('RegisterVehicleList');
  }

  loadUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) { throw Error('No token'); }
      return JSON.parse(token);
    }).then((token) => {
      getUser(token)
        .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
        .then((user) => {
          if (!user.id) throw Error('No valid user');
          this.setState({ user, userLoaded: true });
        }).catch(this.logout);
    }).catch(this.logout);
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => AsyncStorage.removeItem('user'))
      .then(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      (this.state.userLoaded ?
        (
          <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
            <VehiclesTabNavigator
              screenProps={{ navigation: this.props.navigation }}
            />
            <Button2
              styles={{
                flexDirection: 'row',
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
              }}
              onPress={this.getVehicleForm}
              title={languages().subscribeNewVehicle}
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
    navigationOptions: navigationHeaderStyle(languages().vehicles),
  },
  RegisterVehicleList: {
    screen: VehiclesList,
    navigationOptions: navigationHeaderStyle(languages().yourVehicles),
  },
  Vehicle: {
    screen: Vehicle,
    navigationOptions: navigationHeaderStyle(languages().vehicle),
  },
  SubscribedVehicle: {
    screen: SubscribedVehicle,
    navigationOptions: navigationHeaderStyle(languages().vehicle),
  },
  BorrowingVehicle: {
    screen: BorrowingVehicle,
    navigationOptions: navigationHeaderStyle(languages().vehicle),
  },
  Share: {
    screen: ShareForm,
    navigationOptions: navigationHeaderStyle(languages().share),
  },
});


const VehiclesTabNavigator = TabNavigator(
  {
    Subscribed: {
      screen: SubscribedList,
      navigationOptions: {
        tabBarLabel: languages().subscribed,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-swap" size={35} color={tintColor} />,
      },
    },
    Delegated: {
      screen: DelegatedList,
      navigationOptions: {
        tabBarLabel: languages().delegated,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-arrow-round-up" size={35} color={tintColor} />,
      },
    },
    Borrowed: {
      screen: BorrowingList,
      navigationOptions: {
        tabBarLabel: languages().borrowed,
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

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'top',
    animationEnabled: true,
  },
);
