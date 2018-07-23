/* global fetch:false */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import EmptyCarList from './EmptyCarList';
import styles from '../../../config/styles';

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
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      list: null,
      url: props.navigation.state.params.url,
      screen: props.navigation.state.params.screen,
      refreshing: false,
    };
  }


  componentDidMount() {
    this.doRefresh();
  }

  componentWillUnmount() {
    this.setState({ refreshing: false });
  }

  onPress(data) {
    this.props.navigation.navigate(this.state.screen, { data, callback: this.doRefresh });
  }


  getAvatar(item) {
    if (!item.delegateState) {
      return (<Avatar
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        source={require('../../../../../public/image/car_borrowed.png')}
        title={item.plate}
      />);
    }

    if (item.delegateState === 'True') {
      return (<Avatar
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        source={require('../../../../../public/image/car_share.png')}
        title={item.plate}
      />);
    }

    return (<Avatar
      overlayContainerStyle={{ backgroundColor: 'transparent' }}
      source={require('../../../../../public/image/car.png')}
      title={item.plate}
    />);
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

        fetch(this.state.url, data)
          .then(res => res.json())
          .then((listJSON) => {
            if (listJSON[0]) this.setState({ list: listJSON });
          });
      }
    }).finally(() => this.setState({ refreshing: false }));
  }

  renderItem = ({ item }) =>
    (<ListItem
      title={item.plate}
      subtitle=""
      onPress={() => this.onPress(item)}
      avatar={this.getAvatar(item)}
    />);


  render() {
    return (
      <View style={styles.containerList}>
        <FlatList
          renderItem={this.renderItem}
          data={this.state.list}
          onRefresh={this.doRefresh}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={EmptyCarList}
        />
      </View>
    );
  }
}

