/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import { Text, Animated } from 'react-native';
import styles from './config/styles';


type Props = {}
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    };
  }

  componentDidMount() {
    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 2000, // Make it take a while
      },
    ).start(); // Starts the animation
  }
  render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <Avatar
          source={require('../../public/image/sincro_logo.png')}
          xlarge
          title="Close"
          overlayContainerStyle={{ backgroundColor: 'transparent' }}
        />
        <Text style={styles.headerSplash}>
            Mobile
        </Text>
      </Animated.View>
    );
  }
}
