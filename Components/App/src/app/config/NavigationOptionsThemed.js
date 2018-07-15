import styles from './styles';

export default function (title) {
  return {

    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
    },

    title,
    headerStyle: {
      backgroundColor: styles.navBar.headerStyle.backgroundColor,
    },
    headerTintColor: styles.navBar.headerTintColor,


  };
}
