var React = require('react-native');
var NativeImagePicker = require('./NativeImagePicker');

var {
  View,
  NativeImagePicker,
  Component,
  Text,
  Image,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules: {
    ImagePickerManager
  }
} = React;

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  selectPhotoTapped() {
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
      console.log('Response = ', response);
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
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render(){
    var participations = this.props.challenge.participations;
    var list = participations.map((item, index) => {
      return (
        <View key={index}>
          <View><Text>{participations[index].username}</Text><TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity></View></View>
          )
                // Something to press to trigger CameraRoll
                //       <TouchableHighlight
                //         onPress={this.openPage.bind(this, repos[index].html_url)}
                //         underlayColor='transparent'>
                //         <Text style={styles.name}>{repos[index].name}</Text>
                //       </TouchableHighlight>
                //       <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
                //       {desc}
    });
    return (
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
      )
  }
};

  module.exports = ChallengeShow;
