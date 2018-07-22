/* global fetch:false */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import settings from '../../config/serverConnectionSettings';
import EmptyList from './EmptyList';
import styles from '../../config/styles';


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

    this.checkIcon = this.checkIcon.bind(this);
    this.getUser = this.getUser.bind(this);
    this.render = this.render.bind(this);
    this.onPress = this.onPress.bind(this);
    this.getList = this.getList.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }


  onPress(data) {
    this.props.navigation.navigate('Element', { data });
  }

  getUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) {
        // console.warn('null token');
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
      fetch(`${settings.homepage}/validate`, myInit).then(res => res.json())
        .then((user) => {
          if (user.id) {
            this.setState({ user, id: user.id, loading: false });
            this.getList();
          }
        });
    });
  }


  getList() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) {
        console.warn('null token');
        // TODO return to login
        throw Error('No token');
      }
      return JSON.parse(token);
    }).then((token) => {
      const data = {
        body: JSON.stringify({ id: this.state.id }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `${token.token_type} ${token.access_token}` },

      };
      return fetch(this.state.eventsUrl, data)
        .then(res => res.json())
        .then((jsonList) => {
          if (jsonList[0]) this.setState({ list: jsonList });
        });
    }).finally(() => this.setState({ refreshing: false }));
  }

  checkIcon(item) {
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


  renderItem = ({ item }) => (
    <ListItem
      title={item.plate}
      subtitle={item.date.split('T')[0]}
      onPress={() => this.onPress(item)}
      avatar={this.checkIcon(item)}
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
