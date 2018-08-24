/* eslint-disable max-len */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import EmptyCarList from './EmptyCarList';
import styles from '../../config/styles';
import { getUserVehicles } from '../../service/vehicleService';

type Props = {
  navigation: {
    navigate: any,
    state:{
      params:{
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
    this.props.navigation.navigate('Vehicle', { data });
  }

  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getUserVehicles(token)
          .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
          .then(listJSON => (listJSON[0] ? this.setState({ list: listJSON }) : this.setState({ list: null }))).catch(this.logout);
      }
    }).finally(() => this.setState({ refreshing: false }));
  }


  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }

  renderItem = ({ item }) =>
    (<ListItem
      title={item.plate}
      subtitle=""
      onPress={() => this.onPress(item)}
      avatar={<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car.png')} title={item.plate} />}
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

