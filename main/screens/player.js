import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Font } from 'expo';
import { Card } from 'native-base';
import { NavigationActions } from 'react-navigation';


const { width } = Dimensions.get('window');
const soundObject = new Expo.Audio.Sound();

export default class Player extends React.Component {

  state = {
    isPlaying: false,
    loading: true,
    duration: null,
    fontLoad: false
  }

  componentDidMount = async () => {
    await soundObject.loadAsync({
      uri: this.props.navigation.state.params.music.link
    })
    .then(() => {
      this.setState({ loading: false });
    });
    await soundObject.getStatusAsync()
    .then((value) => {
      const newValue = value.durationMillis / 1000;
      this.setState({ duration: newValue });
    });
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      bebas: require('../fonts/BebasNeue-Regular.otf'),
    });

    this.setState({ fontLoad: true });
  }

  componentWillUnmount = async () => {
    await soundObject.stopAsync();
    await soundObject.unloadAsync();
  }

  playMusic = async () => {
    this.setState({ isPlaying: true });
    await soundObject.playAsync();
  }

  stopMusic = async () => {
    this.setState({ isPlaying: false });
    await soundObject.pauseAsync();
  }

  goHome = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home',
    });
    this.props.navigation.dispatch(navigateAction);
  }

  goYoutube = () => {
    Linking.openURL(this.props.navigation.state.params.music.season);
  }

  downloadMusic = () => {
    Linking.openURL(this.props.navigation.state.params.music.link);
  }

  render() {
    const music = this.props.navigation.state.params.music;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor='#D62D20'
          leftComponent={<TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}><Icon name='menu' color='#fff' /></TouchableOpacity>}
          centerComponent={<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Müzik Listesi</Text>}
        />
        {
          this.state.fontLoad ?
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ScrollView>
                <View style={{ width: width, alignItems: 'center' }}>
                  <Card style={{ width: width - 40, height: width - 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      style={{ width: width - 60, height: width - 60 }}
                      source={{ uri: this.props.navigation.state.params.music.photo }}
                    />
                  </Card>
                  <Text style={{ fontSize: 30, marginLeft: 10, marginTop: 10, fontFamily: 'bebas' }}>{music.name}</Text>
                  <Text style={{ fontSize: 18, marginLeft: 10, fontFamily: 'bebas' }}>({music.author})</Text>
                  <TouchableOpacity onPress={() => { this.goYoutube(); }}>
                    <View style={{ width: width - 40, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#D62D20', marginTop: 10, borderRadius: 4 }}>
                      <Text style={{ fontSize: 18, fontFamily: 'bebas', color: 'white' }}>Sahnesini İzle</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={{ width: width, height: 0.5, backgroundColor: 'black' }} />
            { this.state.loading ?
              <View style={{ width: width, height: 60, justifyContent: 'center' }}>
                <ActivityIndicator size='small' />
              </View>
              :
              <View style={{ width: width, height: 60, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { this.goHome(); }}>
                  <View style={{ margin: 10, marginLeft: 20 }}>
                    <Icon name='list' color='#000' type='font-awesome' />
                  </View>
                </TouchableOpacity>
                { this.state.isPlaying ?
                  <TouchableOpacity onPress={() => { this.stopMusic(); }}>
                    <View style={{ margin: 10 }}>
                      <Icon name='pause' color='#000' type='font-awesome' />
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => { this.playMusic(); }}>
                    <View style={{ margin: 10 }}>
                      <Icon name='play' color='#000' type='font-awesome' />
                    </View>
                  </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => { this.downloadMusic(); }}>
                  <View style={{ margin: 10, marginRight: 20 }}>
                    <Icon name='download' color='#000' type='font-awesome' />
                  </View>
                </TouchableOpacity>
              </View>
            }
          </View>
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
        }
      </View>
    );
  }
}
