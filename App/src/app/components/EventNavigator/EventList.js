/* global fetch:false */
/* global alert:false */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import settings from '../../config/serverConnectionSettings';


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
      listRead: false,
    };

    this.getUser = this.getUser.bind(this);
    this.render = this.render.bind(this);
    this.onPress = this.onPress.bind(this);
    this.getList = this.getList.bind(this);
    this.onPress = this.onPress.bind(this);
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
      fetch(`${settings.homepage}/validate`, myInit).then(res => res.json())
        .then((user) => {
          if (user.id) {
            this.setState({ user, id: user.id, loading: false });
          }
        });
    });
  }

  componentDidMount() {
    this.getUser();
  }


  onPress(data) {
    this.props.navigation.navigate('Element', { data });
  }


  getList = () => {
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
      fetch(this.state.eventsUrl, data)
        .then(res => (res.ok ? res.json() : alert(res.status)/* TODO return login */))
        .then(jsonList => this.setState({ list: jsonList }))
        .catch(() => alert('Fetch event failed'))
        .finally(() => this.setState({ refreshing: false, listRead: true }));
    }).catch(e => console.warn(e));
  };

  componentDidUpdate() {
    if (this.state.id && !this.state.refreshing && !this.state.listRead) {
      this.getList();
    }
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.plate}
      subtitle={item.date.split('T')[0]}
      onPress={() => this.onPress(item)}
      selected={item.verified}
    />);

  render() {
    return (
      (this.state.loading && !this.state.refreshing ?
      // eslint-disable-next-line no-use-before-define
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        :
        <FlatList
          renderItem={this.renderItem}
          data={this.state.list}
          onRefresh={this.getList}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => `${index}`}
        />)
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
