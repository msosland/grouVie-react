var React = require('react-native');
var ChallengeShow = require('./ChallengeShow');
var posts = require('../Utils/posts');

var {
	StyleSheet,
	Navigator,
	TouchableHighlight,
	ListView,
	View,
	Component,
	Text,
  TextInput,
  DeviceEventEmitter,
} = React;


class GroupChallenges extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      challengeName: '',
      challengeDescription: '',
      btnLocation: 0,
      dataSource: ds.cloneWithRows(this.props.group.challenges)
    }
  }

  goToChallenge(challenge) {
    this.props.navigator.push({
      component: ChallengeShow,
      passProps: {
        challenge: challenge,
        user: this.props.user
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
    this.listenerTwo.remove();
  }

  componentWillMount () {
    this.listener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.listenerTwo = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    this.setState({btnLocation: e.endCoordinates.height})
  }

  keyboardWillHide (e) {
    this.setState({btnLocation: 0})
  }


  handleSubmit() {
    var challengeName = this.state.challengeName;
    var challengeDescription = this.state.challengeDescription;
    if (challengeName !== '') {
      this.setState({
          challengeName: '',
          challengeDescription: ''
        });
        posts.postChallenge(challengeName, challengeDescription, this.props.group.id, this.props.user.id)
          .then((responseJSON) => {
            this.props.group.challenges.push(responseJSON);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.props.group.challenges)
            });
          })
          .catch((error) => {
            console.log('Request failed', error);
            this.setState({error});
          });
    }
  }

  addNewChallengeForm() {
    return (
      <View>
        <TextInput
          style={styles.inputChallenge}
          value={this.state.challengeName}
          onChangeText={(challengeName) => this.setState({challengeName})}
          placeholder="Challenge Name" />
        <TextInput
          style={styles.inputChallenge}
          value={this.state.challengeDescription}
          onChangeText={(challengeDescription) => this.setState({challengeDescription})}
          placeholder="Challenge Description" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.buttonText}>Create Challenge</Text>
        </TouchableHighlight>
      </View>
    )
  }

  findChallengeStatus(challenge) {
    var obj = {
      backgroundColor: 'gray'
    };

    for (var i=0;i < challenge.participations.length; i++) {
      if (challenge.participations[i].user_id === this.props.user.id && challenge.participations[i].completed === true) {
          obj.backgroundColor = 'green'
      }
      else if (challenge.participations[i].user_id === this.props.user.id) {
          obj.backgroundColor = '#ffdb4d'
      }
    }
    return obj;
  }

  renderRow(challenge) {
    return (
      <View style={this.findChallengeStatus(challenge)}>
        <View style={styles.rowContainer}>
            <TouchableHighlight onPress={() => this.goToChallenge(challenge)} underlayColor="#9BAAF3">
              <Text style={styles.name}>{challenge.name}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.goToChallenge(challenge)} underlayColor="#9BAAF3">
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            </TouchableHighlight>
            <Text style={styles.challengeDate}>{new Date(challenge.start_date).toDateString().substr(0,10) + " - " + new Date(challenge.end_date).toDateString().substr(0,10)}</Text>
        </View>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        <View style={{bottom: this.state.btnLocation}}>{this.addNewChallengeForm()}</View>
      </View>
      )
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  rowContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',
    margin: 10,
  },
  inputChallenge: {
    color: "black",
    justifyContent: 'center',
    textAlign: 'center',
    height: 60,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
    marginTop: 2
  },
  name: {
    fontSize: 25,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  challengeDescription: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  challengeDate: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    height: 60,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optedOut: {
    fontSize: 20,
    color: 'gray'
  },
  optedIn: {
    fontSize: 20,
    color: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 30
  },
});

module.exports = GroupChallenges;
