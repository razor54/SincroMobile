/* global fetch:false */
import React, { Component } from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import EmptyCarList from './EmptyCarList';
import styles from '../../config/styles';
import networkSettings from '../../config/serverConnectionSettings';
import Stack from '../../App';
import { StackNavigator } from 'react-navigation';
import SubscribedVehicle from './SubscribedVehicle';
import navigationHeaderStyle from '../../config/NavigationOptionsThemed';

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

export default class SubscribedList extends Component<Props> {
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
        const data = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(`${networkSettings.homepage}/vehicles/subscribed/`, data)
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
