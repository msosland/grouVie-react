var React = require('react-native');
var NativeImagePicker = require('./NativeImagePicker');
var posts = require('../Utils/posts');
var part;
var {
  View,
  NativeImagePicker,
  Component,
  Text,
  Image,
  ListView,
  StyleSheet,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  NativeModules: {
    ImagePickerManager
  }
} = React;

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 0,
    width: 150,
    height: 150
  },
});

class ChallengeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      avatarSource: null
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.challenge.participations)
    });
  }

  selectPhotoTapped(item) {
    const options = {
      title: 'Photo Picker',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePickerManager.showImagePicker(options, (response) => {
      var id = this.props.user.id;
      var user = this.props.challenge.participations.find(function(participant) {
        return participant.user_id === id;
      })
      posts.postPicture(this.props.challenge.id, user.id ).then((responseJSON) => console.log(responseJSON));
      this.componentDidMount();
      // console.log('Response = ', response);
      // console.log(response.uri);

      // if (response.didCancel) {
      //   console.log('User cancelled photo picker');
      // }
      // else if (response.error) {
      //   console.log('ImagePickerManager Error: ', response.error);
      // }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // }
      // else {
      // }
      // source={{uri: participant.image_url}}
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderParticipant.bind(this)}/>
    );
  }
    renderParticipant(participant) {
      return (
        <View>
          <Text>{participant.username}</Text>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { participant.image_url == "/images/original/missing.png" ? <Text>Select a Photo</Text> :
          <Image style={styles.avatar} source={{uri: participant.image_url}}/>
          }
          </View>
        </TouchableOpacity>
      </View>
      );
    }
  // render(){
  //   var participations = this.props.challenge.participations;
  //   console.log(participations);
  //   var list = participations.map((item, index) => {
  //     part = item.id;
  //     return (
  //       <View key={index}>
  //         <View><Text>{participations[index].username}</Text><TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
  //         <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
  //         { participations[index].image_url == "/images/original/missing.png" ? <Text>Select a Photo</Text> :
  //           <Image style={styles.avatar} source={{uri: participations[index].image_url}} />
  //         }
  //         </View>
  //       </TouchableOpacity></View></View>
  //         )
  //   });
  //   return (
  //     <ScrollView style={styles.container}>
  //       {list}
  //     </ScrollView>
  //     )
  // }
};

  module.exports = ChallengeShow;
