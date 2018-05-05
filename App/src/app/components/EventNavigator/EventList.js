/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';


type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          key: '1',
          name: 'event 1 ',
          date: '10/12/1992',
        },
        {
          key: '2',
          name: 'event 2',
          date: '9/2/1999',
        },
      ],


    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate('Element');
  }

    renderItem = ({ item }) =>
      (<ListItem
        key={item.key}
        title={item.name}
        subtitle={item.date}
        onPress={this.onPress}
      />);


    render() {
      return (
        <FlatList renderItem={this.renderItem} data={this.state.list} />
      );
    }
}

