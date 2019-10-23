import React from 'react';
import { Text, View, TouchableOpacity, Alert, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default class Home extends React.Component {

  state = {
    music: [],
    loading: true
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      bebas: require('../fonts/BebasNeue-Regular.otf'),
    });

    firebase.database().ref().child('musics')
    .on('value', (snap) => {
      let musics = [];
      snap.forEach((data) => {
          const { name, uid, author, link, photo, season } = data.val();
          musics.push({ name: name, uid: uid, author: author, link: link, photo: photo, season: season });
      });
      this.setState({ music: musics, loading: false });
    });
    this.updateAl();
  }

  updateAl = async () => {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      console.log(update);
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        Alert.alert(
          'Herşey senin için',
          'Bir kaç yeni güncelleme geldi...',
          [{ text: 'Tamam', onPress: () => Expo.Updates.reloadFromCache() }]
        );
      }
    } catch (e) {
      // console.log(e)
    }
  }

  sendDatatoPlayer = (item) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Player',
      params: { music: item }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor='#D62D20'
          leftComponent={<TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}><Icon name='menu' color='#fff' /></TouchableOpacity>}
          centerComponent={<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Müzik Listesi</Text>}
        />
        {
          this.state.loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
          :
          <FlatList
            data={this.state.music}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) =>
            <View style={{ marginTop: 5, width: width, alignItems: 'center' }}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: width }}>
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => { this.sendDatatoPlayer(item); }}>
                  <Image
                    style={{ width: 45, height: 45, marginRight: 10, borderRadius: 2 }}
                    source={{ uri: item.photo }}
                  />
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.sendDatatoPlayer(item); }}>
                  <View style={{ height: 45, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'bebas' }}>{item.name}</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'bebas' }}>({item.author})</Text>
                  </View>
                </TouchableOpacity>
                </View>
              <TouchableOpacity onPress={() => { this.sendDatatoPlayer(item); }}>
              <View style={{ margin: 10, height: 45, justifyContent: 'center' }}>
                <Icon name='arrow-right' color='#000' type='font-awesome' />
              </View>
            </TouchableOpacity>
              </View>
              <View style={{ width: width, height: 0.5, backgroundColor: 'lightgrey', marginTop: 2.5, marginBottom: 2.5 }} />
            </View>}
          />
        }
      </View>
    );
  }
}
