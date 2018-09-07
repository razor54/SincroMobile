import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import styles from '../../config/styles';
import EmptyRequestsList from './EmptyRequestsList';
import { getHistory } from '../../service/historyService';

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

export default class HistoryList extends Component<Props> {
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

  }


  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getHistory(token)
          .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
          .then((listJSON) => {
            if (listJSON[0]) this.setState({ list: listJSON });
          }).catch(this.logout);
      }
    }).finally(() => this.setState({ refreshing: false }));
  }


  logout() {
    AsyncStorage.removeItem('token').then(() => AsyncStorage.removeItem('user'))
      .then(() => this.props.navigation.navigate('Auth'));
  }

    renderItem = ({ item }) =>
      (<ListItem
        title={item.actionId}
        subtitle={item.date.split('T')[0]}
        rightTitle={item.driverId.toString()}
        // onPress={() => this.onPress(item)}
        avatar={this.renderAvatar(item)}
        hideChevron
      />);


    renderAvatar(item) {
      if (item.state === 'Delegate') {
        return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_delegated.png')} title={item.plate} />);
      }

      if (item.state === 'Borrow') {
        return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_borrowed.png')} title={item.plate} />);
      }

      if (item.state === 'Borrow Cancel') {
        return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_borrowed_cancel.png')} title={item.plate} />);
      }

      if (item.state === 'Delegate Cancel') {
        return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_delegated_cancel.png')} title={item.plate} />);
      }

      if (item.state === 'Payment') {
        return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/img_60377.png')} title={item.plate} />);
      }

      return (<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car.png')} title={item.plate} />);
    }

    render() {
      return (
        <View style={styles.containerList}>
          <FlatList
            renderItem={this.renderItem}
            data={this.state.list}
            onRefresh={this.doRefresh}
            refreshing={this.state.refreshing}
            keyExtractor={(item, index) => `${index}`}
            ListEmptyComponent={EmptyRequestsList}
          />
        </View>
      );
    }
}

