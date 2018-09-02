/* eslint-disable max-len */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import EmptyCarList from './EmptyCarList';
import styles from '../../config/styles';
import { getSubscribedVehicles } from '../../service/vehicleService';

type Props = {
    screenProps: {
        navigation: {
            navigate: any,
        },
    }
}

export default class SubscribedList extends Component<Props> {
  constructor(props) {
    super(props);

    this.doRefresh = this.doRefresh.bind(this);
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      list: null,
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
    this.props.screenProps.navigation.navigate('SubscribedVehicle', { data, callback: this.doRefresh });
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => AsyncStorage.removeItem('user'))
      .then(() => this.props.navigation.navigate('Auth'));
  }
  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getSubscribedVehicles(token)
          .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
          .then(listJSON => (listJSON[0] ? this.setState({ list: listJSON }) : this.setState({ list: null })));
      }
    }).finally(() => this.setState({ refreshing: false }));
  }

  renderAvatar(item) {
    if (item.delegateState === 'True') {
      return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_delegated.png')} title={item.plate} />);
    }

    return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car.png')} title={item.plate} />);
  }


  renderItem = ({ item }) =>
    (<ListItem
      title={item.plate}
      subtitle=""
      onPress={() => this.onPress(item)}
      avatar={this.renderAvatar(item)}
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
