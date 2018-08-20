/* eslint-disable max-len */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import EmptyCarList from './EmptyCarList';
import styles from '../../config/styles';
import { getDelegatedVehicles } from '../../service/vehicleService';

type Props = {
    navigation: {
        navigate: any,
        state:{
            params:{
                url: string,
                screen:string,
            }
        }
    },
    screenProps: {
        user: {
            id: number,
            email: String,
            name: String,
        }
    }
}

export default class DelegatedList extends Component<Props> {
  constructor(props) {
    super(props);

    this.doRefresh = this.doRefresh.bind(this);
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);

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
    this.props.navigation.navigate('SubscribedVehicle', { data, callback: this.doRefresh });
  }

  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getDelegatedVehicles(token)
          .then(res => res.json())
          .then(listJSON => (listJSON[0] ? this.setState({ list: listJSON }) : this.setState({ list: null })));
      }
    }).finally(() => this.setState({ refreshing: false }));
  }

    renderItem = ({ item }) =>
      (<ListItem
        title={item.plate}
        subtitle=""
        onPress={() => this.onPress(item)}
        avatar={<Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} source={require('../../../../public/image/car_delegated.png')} title={item.plate} />}
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
