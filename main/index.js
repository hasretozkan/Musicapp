import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Home from './screens/home';
import Player from './screens/player';
import Feedback from './screens/feedback';
import SideMenu from './components/Menu';

const { width } = Dimensions.get('window');


const config = {
  apiKey: 'AIzaSyDQBYJf6Z4fqlmLIvkvRyALn4RetDcaqGI',
  authDomain: 'cukurapp-d49b5.firebaseapp.com',
  databaseURL: 'https://cukurapp-d49b5.firebaseio.com',
  projectId: 'cukurapp-d49b5',
  storageBucket: 'cukurapp-d49b5.appspot.com',
  messagingSenderId: '832880941450'
};
firebase.initializeApp(config);


export const DrawersMenu = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Feedback: {
    screen: Feedback
  },
  Player: {
    screen: Player
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: width * (3 / 4)
});

export default DrawersMenu;
