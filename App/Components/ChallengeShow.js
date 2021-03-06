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
  Alert,
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
          this.props.refreshChallenges();
          this.setState({
          });
        }).done();
      }
    });
  }

  handleSubmit(){
    posts.optInToChallenge(this.props.challenge.id, this.props.user.id)
    .then((responseJSON) => {
      this.props.challenge.participations.push(responseJSON);
      this.setState({});
      this.props.refreshChallenges();
    }).then(Alert.alert("CHALLENGE ACCEPTED!!!!", null))
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

  daysSinceCompleted(participation) {
    if (participation.completed) {
      var completedDate = new Date(participation.updated_at);
      return " - " + Math.floor((new Date() - Date.parse(completedDate)) / 1000 / 3600) + " hours ago";
      }
    else {
      return "";
    }
  }

  isCompletedStyling(participant) {
    var obj = {
      flexDirection: 'row',
      padding: 3,
      margin: 5,
      alignSelf: 'center',
      alignItems: 'center'
    }

    if (participant.completed !== true){
      obj.backgroundColor = '#cccccc';
    }
    return obj;
  }

  missingPhotoIcon(participation) {
    if (participation.user_id == this.props.user.id) {
      return <Icon name="camera" color="#5e5e5e" style={{fontSize: 160}}/>;
    }
    else {
      return <Icon name="frown-o" color="#5e5e5e" style={{fontSize: 160}}/>;
    }
  }

  isUserPicture(participation) {
    if (participation.user_id == this.props.user.id) {
     return <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                {participation.image_url == "/images/original/missing.png" ?
                  <Text>{this.missingPhotoIcon(participation)}</Text> :
                    <Image style={styles.avatar} source={{uri: participation.image_url}} />
                }
              </View>
            </TouchableOpacity>
    }
    else {
      return <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                {participation.image_url == "/images/original/missing.png" ?
                  <Text>{this.missingPhotoIcon(participation)}</Text> :
                    <Image style={styles.avatar} source={{uri: participation.image_url}} />
                }
              </View>
    }
  }

  render(){
    var participations = this.props.challenge.participations;
    var list = participations.map((item, index) => {
      return (
        <View key={index} style={styles.participant}>
          <View style={this.isCompletedStyling(participations[index])}>
            {this.isUserPicture(participations[index])}
          </View>
          <Text style={styles.read}>{participations[index].username + this.daysSinceCompleted(participations[index])}</Text>
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
    justifyContent: 'center',
  },
  date: {
    fontSize: 15,
  },
  read: {
    flex: 3,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 35
  },
  avatar: {
    flexDirection: 'row',
    height: 360,
    width: 300,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participant: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    paddingBottom: 5
  }
});

module.exports = ChallengeShow;
