/* global fetch:false */
import React, { Component } from 'react';
import { FlatList, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import networkSettings from '../../../config/serverConnectionSettings';

type Props = {
  navigation: {
    navigate: any,
    state:{
      params:{
        url: string,
        screen:string,
      }
    }
  }
}

export default class VehiclesList extends Component<Props> {
  constructor(props) {
    super(props);

    this.doRefresh = this.doRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPress = this.onPress.bind(this);

    this.state = {
      list: [],
      url: props.navigation.state.params.url,
      screen: props.navigation.state.params.screen,
      refreshing: false,
    };
  }


  componentDidMount() {
    this.doRefresh();
  }

  onPress(data) {
    this.props.navigation.navigate(this.state.screen, { data });
  }

  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const data = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(this.state.url, data).then(reply => reply.json())
          .then(list => this.setState({ list, refreshing: false }))
          .catch(e => alert(e));
      }
    });
  }

  renderItem = ({ item }) =>
    (<ListItem
      title={item.plate}
      onPress={() => this.onPress(item)}
      subtitle={item.date}
    />);


  render() {
    return (<FlatList
      renderItem={this.renderItem}
      data={this.state.list}
      keyExtractor={(item, index) => `${index}`}
      onRefresh={this.doRefresh}
      refreshing={this.state.refreshing}
    />
    );
  }
}

