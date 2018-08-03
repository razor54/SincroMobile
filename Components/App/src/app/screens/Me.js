/* eslint-disable no-use-before-define,max-len,react/sort-comp */
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import UserInfo from '../components/MeComponents/UserInfo';
import BorrowingRequest from '../components/MeComponents/BorrowingRequest';
import RequestsList from '../components/MeComponents/RequestsList';
import { getUser } from '../service/userService';
import HistoryList from '../components/MeComponents/HistoryList';


type Props = {
    navigation : any
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);

    this.getBorrowingRequests = this.getBorrowingRequests.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      userLoaded: false,
      user: null,
    };
  }

  loadUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) { throw Error('No token'); }

      return JSON.parse(token);
    }).then((token) => {
      getUser(token)
        .then(res => res.json())
        .then((user) => {
          if (!user.id) throw Error('No valid user');
          this.setState({ user, userLoaded: true });
        });
    }).catch(this.logout);
  }

  componentDidMount() {
    this.loadUser();
  }

  getBorrowingRequests() {
    this.props.navigation.navigate('RequestsList');
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      (this.state.userLoaded ?
        (
          <View style={styles.container_me}>

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
              </View>
            </View>

            <View style={styles.container_me_activity}>
              <Text style={styles.header_left}> Recent Activity </Text>
            </View>
            <HistoryList user={this.state.user} />
          </View>
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
  Profile: {
    screen: Profile,
    navigationOptions: navigationHeaderStyle('Profile'),
  },
  RequestsList: {
    screen: RequestsList,
    navigationOptions: navigationHeaderStyle('Requests'),
  },
  BorrowingRequestElement: {
    screen: BorrowingRequest,
    navigationOptions: navigationHeaderStyle('Borrowing Request'),
  },

});

