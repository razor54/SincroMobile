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
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },

  button2: {
    backgroundColor: theme.actionable.activeColor,
    width: 175,
    borderColor: 'transparent',
    borderRadius: 5,
    borderWidth: 0,
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

  container_me: {
    flex: 1,
    backgroundColor: '#fffdfd',
  },

  container_me_activity: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fffdfd',
  },

  header: {
    fontSize: 50,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  headerSplash: {
    fontSize: 50,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    color: '#7791aa',
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
    color: '#000000',
    fontSize: 15,
    textAlign: 'center',
  },

  userIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,

  },

  facebookButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  header_left: {
    fontSize: 30,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },

  logoutButton: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' },
};
