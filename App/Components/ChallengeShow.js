var React = require('react-native');
var posts = require('../Utils/posts');
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
  // PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules: {
    ImagePickerManager
  }
} = React;

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  button: {
    top: 200,
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
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
            <Text>Accept Challenge</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderParticipant.bind(this)}
        renderFooter={this.footer.bind(this)}/>
        // <View>{this.footer()}</View>
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
