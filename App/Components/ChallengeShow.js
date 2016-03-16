var React = require('react-native');
var posts = require('../Utils/posts');
var NativeImagePicker = require('./NativeImagePicker');
var posts = require('../Utils/posts');
var Icon = require('react-native-vector-icons/FontAwesome');

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
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
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
      }
    });
  }

  photoContainer(participant) {
    var obj = {
      flexDirection: 'row',
      padding: 3,
      margin: 5,
      // width: 180,
      alignSelf: 'center',
      alignItems: 'center'
    }
    if(participant.completed === true){
      obj.backgroundColor = 'green';
    } else {
      obj.backgroundColor = 'red';
    }
    return obj;
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
          underlayColor="#ffffff">
            <Text style={styles.buttonText}>Accept Challenge</Text>
        </TouchableHighlight>
      </View>
    )
  }

  checkCompletion(participation) {
    if (participation.completed) {
      return participation.updated_at.toString().substr(5,5);
      }
    else {
      return "Not Complete";
    }
  }

  isYourPhoto(participation) {
    if (participation.user_id == this.props.user.id) {
      return <Icon name="camera" color="#000000" style={{fontSize: 60}}/>;
    }
    else {
      return <Icon name="frown-o" color="#000000" style={{fontSize: 60}}/>;
    }
  }
  render(){
    var participations = this.props.challenge.participations;
    console.log(participations);
    var list = participations.map((item, index) => {
      return (
        <View key={index}>
          <View style={this.photoContainer(participations[index])}><TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}><View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { participations[index].image_url == "/images/original/missing.png" ? <Text>{this.isYourPhoto(participations[index])}</Text> :
            <Image style={styles.avatar} source={{uri: participations[index].image_url}} />
          }
          </View></TouchableOpacity>
        </View>
          <Text style={styles.read}>{participations[index].username}</Text>
          <Text style={styles.read}>{this.checkCompletion(participations[index])}</Text>
        </View>
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
    paddingTop: 55,
    backgroundColor: '#F5FCFF'
  },
  button: {
    height: 60,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  read: {
    flex: 3,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'black',
    fontSize: 35
  },
  buttonText: {
    color: 'white',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 6,
  },
  avatarContainer: {
    // borderColor: '#9B9B9B',
    // borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = ChallengeShow;
