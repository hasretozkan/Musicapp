import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity, Dimensions, Image, Linking } from 'react-native';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

class SideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  rateApp = () => {
    Linking.openURL('google.com.tr');
  }

  render() {
    return (
      <View style={{ paddingTop: 20, flex: 1 }}>
        <ScrollView>
          <View>
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ paddingVertical: 10, paddingHorizontal: 5, color: '#D62D20', fontWeight: 'bold', fontSize: 25 }}>
                Menü
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.navigateToScreen('Home')}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Icon name='music' color='#D62D20' type='font-awesome' />
              </View>
              <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 20 }}>
                Müzik Listesi
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Calculate')}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Icon name='star' color='#D62D20' type='font-awesome' />
              </View>
              <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 20 }}>
                Uygulamaya Oyla
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Feedback')}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Icon name='rss-square' color='#D62D20' type='font-awesome' />
              </View>
              <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 20 }}>
                Geri Bildirim
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            style={{ width: width * (3 / 8), height: width * (3 / 8), margin: width * (3 / 16) }}
            source={require('../../assets/icon.png')}
          />
        </ScrollView>
        <View style={{ padding: 20, backgroundColor: '#D62D20', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>5Pre Team</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
