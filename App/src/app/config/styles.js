
import theme from './theme';

export default{

    base: {
        flex: 1,
        backgroundColor: theme.base.backgroundColor
    },

    statusBar: {
        style: 'light-content',
        backgroundColor: theme.base.backgroundColor
    },
    messageStatusBar: {
        style: 'default'
    },
    navBar: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
    }

}