import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './Pages/Main';
import Profile from './Pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevMap',
                headerTitleAlign: "center",
                headerTintColor: '#fff'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github',
                headerTitleAlign: "center",
                headerTintColor: '#fff'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#ffff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7d40e7'
            }
        }
    })
)

export default Routes;
