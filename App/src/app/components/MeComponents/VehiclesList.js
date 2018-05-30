/* global fetch:false */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import networkSettings from '../../config/serverConnectionSettings';

type Props = {
  user: any,
  getCallback: any,
  navigation: {
    navigate: any,
  }
}

export default class VehiclesList extends Component<Props> {
  constructor(props) {
    super(props);

    this.doRefresh = this.doRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.setCallback = props.getCallback.bind(this);
    this.onPress = this.onPress.bind(this);

    this.state = {
      list: [],
      userId: props.user.id,
      refreshing: false,
    };
  }


  componentDidMount() {
    this.setCallback(this.doRefresh);
    this.doRefresh();
  }

  onPress(data) {
    this.props.navigation.navigate('VehicleElement', { data });
  }

  doRefresh() {
    this.setState({ refreshing: true });
    const url = `${networkSettings.homepage}/vehicles/${this.state.userId}`;
    fetch(url).then(reply => reply.json())
      .then(list => this.setState({ list, refreshing: false }));
    // catch
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

