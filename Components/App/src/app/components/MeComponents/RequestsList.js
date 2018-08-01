import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import styles from '../../config/styles';
import EmptyRequestsList from './EmptyRequestsList';
import { getVehicleRequests } from '../../service/vehicleService';

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

export default class RequestsList extends Component<Props> {
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
    this.props.navigation.navigate('BorrowingRequestElement', { data, callback: this.doRefresh });
  }


  doRefresh() {
    this.setState({ refreshing: true });
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        getVehicleRequests(token)
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
            ListEmptyComponent={EmptyRequestsList}
          />
        </View>
      );
    }
}

