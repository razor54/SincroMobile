import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,

} from 'react-native';
import styles from '../../config/styles';

type Props = {
    navigation:{
        state:{
            params:{
                data:any
            }
        },
        navigate: any
    }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}>
                    Event Item
        </Text>
        <Text style={styles.textStretch}> {data.name} </Text>
        <Text style={styles.textStretch}> This event occurred on {data.date} </Text>
        <Text style={styles.textStretch}> Confirm that it was you? </Text>

      </KeyboardAvoidingView>

    );
  }

  componentDidMount() {
    // console.warn(this.props.navigation.state.params.data);
  }
}
