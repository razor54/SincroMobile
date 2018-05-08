import theme from './theme';

export default {

  base: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },

  statusBar: {
    style: 'light-content',
    backgroundColor: theme.base.backgroundColor,
  },
  messageStatusBar: {
    style: 'default',
  },
  navBar: {
    headerStyle: {
      backgroundColor: '#1a1c39',
    },
    headerTintColor: '#fff',
  },

  wrapper: {
    flex: 1,
  },

  button: {
    backgroundColor: theme.actionable.activeColor,
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
    flexWrap: 'wrap',
  },
  textBtn: {
    // alignItems: 'center',
    backgroundColor: '#FFF',
    // foregroundColor: theme.actionable.activeColor,
    // padding: 10
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffdfd',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 50,
    marginBottom: 60,
    color: '#000000',
    fontWeight: 'bold',
  },
  textStretch: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fffdfd',
  },
  textCenter: {
    justifyContent: 'flex-end',
    fontSize: 20,
    backgroundColor: '#fffdfd',
    paddingLeft: 40,
    paddingRight: 40,
  },
  textRight: {
    justifyContent: 'flex-end',
    fontSize: 20,
    backgroundColor: '#fffdfd',

  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#d2e0ff',
    padding: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },

};
