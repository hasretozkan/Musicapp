import React from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default class Feedback extends React.Component {

  state = {
    loading: true,
    comment: '',
    feedbacked: false
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      bebas: require('../fonts/BebasNeue-Regular.otf'),
    });

    this.setState({ loading: false });
  }

  sendFeedback = () => {
    firebase.database().ref('feedbacks').push({
      feedback: this.state.comment,
    })
    .then((value) => {
      this.setState({ feedbacked: true, comment: '' });
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor='#D62D20'
          leftComponent={<TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}><Icon name='menu' color='#fff' /></TouchableOpacity>}
          centerComponent={<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Geri Bildirim</Text>}
        />
        {
          this.state.loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
          :
          (this.state.feedbacked ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontFamily: 'bebas', color: 'black' }}>Geri Bildiriminiz Yollandı.</Text>
              <TouchableOpacity onPress={() => { this.setState({ feedbacked: false }); }}>
                <View style={{ width: width - 40, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#D62D20', marginTop: 10, borderRadius: 4 }}>
                  <Text style={{ fontSize: 18, fontFamily: 'bebas', color: 'white' }}>Tekrar Yolla</Text>
                </View>
              </TouchableOpacity>
            </View>
            :
            <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            style={{ width: width * (3 / 8), height: width * (3 / 8), margin: 15 }}
            source={require('../../assets/icon.png')}
          />
          <TextInput
            placeholder="Geri bildiriminiz"
            style={{ width: width - 40, padding: 15, borderWidth: 0.5, borderRadius: 4 }}
            underlineColorAndroid='transparent'
            onChangeText={comment => this.setState({ comment: comment })}
            value={this.state.comment}
            multiline
          />
          <TouchableOpacity onPress={() => { this.sendFeedback(); }}>
            <View style={{ width: width - 40, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#D62D20', marginTop: 10, borderRadius: 4 }}>
              <Text style={{ fontSize: 18, fontFamily: 'bebas', color: 'white' }}>Geri Bildirimi Yolla</Text>
            </View>
          </TouchableOpacity>
          </View>)
        }
      </View>
    );
  }
}
