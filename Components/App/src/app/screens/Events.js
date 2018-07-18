
import { StackNavigator } from 'react-navigation';

import EventList from '../components/EventNavigator/EventList';
import EventElement from '../components/EventNavigator/EventElement';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';

export default StackNavigator({


  List: {
    screen: EventList,

    navigationOptions: navigationHeaderStyle('Events List'),
  },

  Element: {
    screen: EventElement,
    navigationOptions: navigationHeaderStyle('Event Detail'),

  },


});