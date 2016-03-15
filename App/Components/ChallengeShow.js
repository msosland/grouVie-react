var React = require('react-native');
var posts = require('../Utils/posts');
var NativeImagePicker = require('./NativeImagePicker');
var posts = require('../Utils/posts');

var {
  View,
  NativeImagePicker,
  Component,
  Text,
  Image,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules: {
    ImagePickerManager
  }
} = React;


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
      var id = this.props.user.id;
      var user = this.props.challenge.participations.find(function(participant) {
        return participant.user_id === id;
      })
      var index = this.props.challenge.participations.indexOf(user);
      console.log(index);
      if (index > -1) {
        this.props.challenge.participations.splice(index, 1);
      }
      posts.postPicture(response.data, this.props.challenge.id, user.id ).then((responseJSON) => {
        this.props.challenge.participations.splice(index, 0, responseJSON);
        this.setState({
        });
      }).done();

    });
  }

  handleSubmit(){
    posts.optInToChallenge(this.props.challenge.id, this.props.user.id)
    .then((responseJSON) => {
      this.props.challenge.participations.push(responseJSON);
      this.setState({});
    })
    .catch((error) => {
      console.log('Request failed', error);
      this.setState({error});
    });
  }

  footer() {
    for (var i = 0; i < this.props.challenge.participations.length; i++) {
      if (this.props.challenge.participations[i].user_id === this.props.user.id) {
        return true;
      }
    }
    return (
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.buttonText}>Accept Challenge</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render(){
    var participations = this.props.challenge.participations;
    console.log(participations);
    var list = participations.map((item, index) => {
      return (
        <View key={index}>
          <View><Text style={styles.read}>{participations[index].username}</Text><TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { participations[index].image_url == "/images/original/missing.png" ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={{uri: participations[index].image_url}} />
          }
          </View>
        </TouchableOpacity></View></View>
          )
    });
    return (
      <View style={styles.container}>
        <ScrollView>{list}</ScrollView>
        <View>{this.footer()}</View>
      </View>
      )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F5FCFF'
  },
  button: {
    height: 60,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  read: {
    color:'black',
  },
  buttonText: {
    color: 'white',
  },
  avatar: {
    borderRadius: 0,
    width: 150,
    height: 150
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = ChallengeShow;
