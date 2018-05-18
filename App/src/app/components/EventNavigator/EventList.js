/* global fetch:false */
/* global alert:false */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
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
      id: props.screenProps.user.id,
      refreshing: false,
    };

    this.render = this.render.bind(this);
    this.onPress = this.onPress.bind(this);
    this.getList = this.getList.bind(this);
    this.onPress = this.onPress.bind(this);
  }


  componentDidMount() {
    this.getList();
  }


  onPress(data) {
    this.props.navigation.navigate('Element', { data });
  }


  getList = () => {
    this.setState({ refreshing: true });
    const data = {
      body: JSON.stringify({ id: this.state.id }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(this.state.eventsUrl, data)
      .then(res => (res.ok ? res.json() : alert(res.status)))
      .then(jsonList => this.setState({ list: jsonList }))
      .catch(() => alert('Fetch event failed'))
      .finally(() => this.setState({ refreshing: false }));
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.plate}
      subtitle={item.date.split('T')[0]}
      onPress={() => this.onPress(item)}
      selected={item.verified}
    />);

  render() {
    return (<FlatList
      renderItem={this.renderItem}
      data={this.state.list}
      onRefresh={this.getList}
      refreshing={this.state.refreshing}
      keyExtractor={(item, index) => `${index}`}
    />);
  }
}

