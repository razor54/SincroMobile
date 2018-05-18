/* global fetch:false */
/* global alert:false */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CheckBox, FormInput, FormLabel } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import networkSettings from '../../config/serverConnectionSettings';


type Props = {
    user : any,
}
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
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

    this.renderButton = this.renderButton.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handlePlate = this.handlePlate.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleAddVehicle = this.handleAddVehicle.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);

    this.state = {
      userId: props.user.id,
      visibleModal: false,
      plate: null,
      isPlateValid: false,
      subscribe: false,
      date: null,
      list: null,
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

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscribed: this.state.subscribe,
          plate: this.state.plate,
          registryDate: this.state.date,
          ownerId: this.state.userId,
        }),
      })
        .then((response) => { if (response.status !== 200) alert('There was an error'); })
        .catch(() => {
          // this.setState({ isLoading: false });
          alert('There was an error');
        })
        .done();
      this.setState({ visibleModal: false });
    }


    handleSubscribe() {
      this.setState({ subscribe: !this.state.subscribe });
    }


    handlePlate(plate) {
      const test = /^\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}$/;
      this.setState({
        plate,
        isplateValid: test.test(plate),
      });
    }

    renderModalContent = () => (
      <View style={styles.modalContent}>


        <FormLabel>Plate</FormLabel>
        <FormInput
          onChangeText={this.handlePlate}
          inputStyle={styles.inputStyle}
        />
        {null /* plateError */ }


        <FormLabel>Registration Date</FormLabel>

        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Text style={styles.inputStyle}>PickDate</Text>
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
        {this.renderButton('Add', this.handleAddVehicle)}
        {this.renderButton('Close', () => this.setState({ visibleModal: false }))}
      </View>
    );

    renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );

    render() {
      return (
        <View>
          {this.renderButton('Register a Vehicle', () => this.setState({ visibleModal: true }))}
          <Modal
            isVisible={this.state.visibleModal}
            backdropColor="black"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            {this.renderModalContent()}
          </Modal>
        </View>
      );
    }
}

