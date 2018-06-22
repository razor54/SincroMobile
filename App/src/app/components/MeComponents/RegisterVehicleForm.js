/* global fetch:false */
/* global alert:false */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
  Button,
  Alert,
} from 'react-native';
import { Avatar, CheckBox, FormInput, FormLabel } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import networkSettings from '../../config/serverConnectionSettings';


type Props = {
    navigation:{
        state:{
            params: {
                user: any,
            }
        },
        navigate: any,
        pop: any
    }
}
const SCREEN_WIDTH = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4ba5ff',
    color: '#ffffff',
    padding: 10,
    margin: 20,
    textAlign: 'center',
    fontFamily: 'arial',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  inputStyle: {
    borderWidth: 2,
    textAlign: 'center',
    borderColor: 'lightgrey',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    margin: 10,
    paddingLeft: 10,
  },
});


export default class RegisterVehicleForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.handlePlate = this.handlePlate.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleAddVehicle = this.handleAddVehicle.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);

    this.state = {
      userId: props.navigation.state.params.user.id,
      plate: null,
      subscribe: false,
      date: new Date(),
      isDateTimePickerVisible: false,
    };
  }


  componentDidMount() {
  }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
      this.setState({ date });
      this.hideDateTimePicker();
    };

    handleAddVehicle() {
      const url = `${networkSettings.homepage}/vehicle`;
      AsyncStorage.getItem('token').then((t) => {
        const token = JSON.parse(t);

        if (token != null) {
          if (!this.state.plate) return this.showErrorMessage('Not Valid Plate');

          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${token.token_type} ${token.access_token}`,
            },
            body: JSON.stringify({
              subscribed: this.state.subscribe,
              plate: this.state.plate,
              registryDate: this.state.date,
              ownerId: this.state.userId,
            }),
          })
            .then((response) => {
              if (response.status !== 200) return this.showErrorMessage('Not Valid Plate');
              return this.showSuccessMessage();
            })
            .catch(() => {
              // this.setState({ isLoading: false });
              this.showErrorMessage('Not Valid Plate');
            });
        }
      });
    }


    handleSubscribe() {
      this.setState({ subscribe: !this.state.subscribe });
    }

    showSuccessMessage() {
      Alert.alert(
        'Register',
        'Vehicle was registered successfully',
        [
          { text: 'Ok', onPress: () => this.props.navigation.pop(1, 'RegisterVehicleForm') },
        ],
        { cancelable: false },
      );
    }

    showErrorMessage(error) {
      Alert.alert(
        'Error',
        error,
        [
          { text: 'Try Again', onPress: () => this.setState({ plate: null }) },
          { text: 'Cancel', onPress: () => this.props.navigation.pop(1, 'RegisterVehicleForm') },
        ],
        { cancelable: false },
      );
    }


    handlePlate(plate) {
      const test = /^\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}$/;
      this.setState({
        plate,
        isplateValid: test.test(plate),
      });
    }

    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

          <FormLabel>Plate</FormLabel>
          <View style={{ alignItems: 'center' }} >
            <FormInput
              onChangeText={this.handlePlate}
              inputStyle={styles.inputStyle}
            />
          </View>
          {null /* plateError */ }


          <FormLabel> Date </FormLabel>

          {null /* plateError */ }

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.showDateTimePicker}>
            <Text style={styles.inputStyle}>
              {this.state.date.getDate()} /
              {this.state.date.getMonth()} /
              {this.state.date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <CheckBox
            title="Subscribed"
            onPress={this.handleSubscribe}
            checked={this.state.subscribe}
          />
          {null /* passwordError */}

          <Button title="Add" onPress={this.handleAddVehicle} />
        </KeyboardAvoidingView>

      );
    }
}

