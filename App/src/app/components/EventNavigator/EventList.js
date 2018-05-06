import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';


type Props = {
    navigation:{
        state:{
            params:any
        },
        navigate: any
    }
};
export default class extends Component<Props> {
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

  onPress(data) {
    this.props.navigation.navigate('Element', { data });
  }

    renderItem = ({ item }) =>
      (<ListItem
        key={item.key}
        title={item.name}
        subtitle={item.date}
        onPress={() => this.onPress(item)}
      />);


    render() {
      return (
        <FlatList renderItem={this.renderItem} data={this.state.list} />
      );
    }
}

