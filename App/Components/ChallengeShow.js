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
  }
});

class ChallengeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
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
      // console.log('Response = ', response);
      console.log(response.uri);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
      posts.postPicture(this.props.challenge.id, part).then((responseJSON) => console.log(responseJSON));
      this.setState({});
      }
    });
  }

  render(){
    posts.postPicture(this.props.challenge.id, 5).then((responseJSON) => console.log(responseJSON));
    var participations = this.props.challenge.participations;
    console.log(participations);
    var list = participations.map((item, index) => {
      part = item.id;
      return (
        <View key={index}>
          <View><Text>{participations[index].username}</Text><TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { participations[index].image_url == "/images/original/missing.png" ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={participations[index].image_url} />
          }
          </View>
        </TouchableOpacity></View></View>
          )
    });
    return (
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
      )
  }
};

  module.exports = ChallengeShow;
