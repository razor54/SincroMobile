
import { StackNavigator } from 'react-navigation';

import EventList from '../components/EventsComponents/EventList';
import EventElement from '../components/EventsComponents/EventElement';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import PaymentForm from '../components/EventsComponents/PaymentForm';
import languages from '../config/languages';

export default StackNavigator({


  List: {
    screen: EventList,

    navigationOptions: navigationHeaderStyle(languages().eventsList),
  },

  Element: {
    screen: EventElement,
    navigationOptions: navigationHeaderStyle(languages().eventDetail),

  },

  Payment: {
    screen: PaymentForm,
    navigationOptions: navigationHeaderStyle(languages().eventPayment),

  },


});
