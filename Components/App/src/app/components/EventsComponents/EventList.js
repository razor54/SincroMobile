import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import settings from '../../config/serverConnectionSettings';
import EmptyList from './EmptyList';
import styles from '../../config/styles';
import { getUser } from '../../service/userService';
import { getEventList } from '../../service/eventService';


type Props = {
    navigation:{
        state:{
            params:any
        },
        navigate: any
    },

    screenProps: {
        user: {
            id: number,
            email: String,
            name: String,
        }
    }
}
export default class extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      list: null, // [{id,name,date},{...}]
      eventsUrl: `${settings.homepage}/user/event`,
      id: null,
      refreshing: false,
      loading: true,
      user: null,
    };

    this.loadUser = this.loadUser.bind(this);
    this.render = this.render.bind(this);
    this.onPress = this.onPress.bind(this);
    this.getList = this.getList.bind(this);
    this.onPress = this.onPress.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }


  onPress(data) {
    this.props.navigation.navigate('Element', { data });
  }


  getAvatar(item) {
    if (item.state === 'Paid') {
      return (<Avatar
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        source={require('../../../../public/image/practical-test.png')}
        title={item.plate}
      />);
    }

    if (item.driverId !== this.state.user.id) {
      return (<Avatar
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        source={require('../../../../public/image/car_owner-512.png')}
        title={item.plate}
      />);
    }

    if (item.verified) {
      return (<Avatar
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        source={require('../../../../public/image/green_car.png')}
        title={item.plate}
      />);
    }


    return (<Avatar
      overlayContainerStyle={{ backgroundColor: 'transparent' }}
      source={require('../../../../public/image/red_car.png')}
      title={item.plate}
    />);
  }


  getList() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getEventList(token, this.state)
          .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
          .then((jsonList) => {
            if (jsonList[0]) this.setState({ list: jsonList });
          }).catch(this.logout);
      }
    }).finally(() => this.setState({ refreshing: false }));
  }


  loadUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) { throw Error('No token'); }
      return JSON.parse(token);
    }).then((token) => {
      getUser(token)
        .then((res) => { if (!res.ok) throw Error('Invalid token'); return res.json(); })
        .then((user) => {
          if (!user.id) throw Error('Invalid User');
          this.setState({ user, id: user.id, loading: false });
          this.getList();
        }).catch(this.logout);
    }).catch(this.logout);
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.plate}
      subtitle={item.date.split('T')[0]}
      onPress={() => this.onPress(item)}
      avatar={this.getAvatar(item)}
    />
  );

  render() {
    return (
      <View style={styles.containerList}>
        <FlatList
          renderItem={this.renderItem}
          data={this.state.list}
          onRefresh={this.getList}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={EmptyList}
        />
      </View>
    );
  }
}
