
import { StackNavigator } from 'react-navigation';

import EventList from '../components/EventNavigator/EventList';
import EventElement from '../components/EventNavigator/EventElement';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import PaymentForm from '../components/EventNavigator/PaymentForm';

export default StackNavigator({


  List: {
    screen: EventList,

    navigationOptions: navigationHeaderStyle('Events List'),
  },

  Element: {
    screen: EventElement,
    navigationOptions: navigationHeaderStyle('Event Detail'),

  },

  Payment: {
    screen: PaymentForm,
    navigationOptions: navigationHeaderStyle('Event Payment'),

  },


});
