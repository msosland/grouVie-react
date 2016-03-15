
var React = require('react-native');
var ChallengeShow = require('./ChallengeShow');
var posts = require('../Utils/posts');

var {
	StyleSheet,
	Navigator,
	TouchableHighlight,
	ScrollView,
	View,
	Component,
	Text,
  TextInput,
  DeviceEventEmitter,
} = React;


class GroupChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeName: '',
      challengeDescription: '',
      btnLocation: 0
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

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
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
    this.setState({
      challengeName: '',
      challengeDescription: ''
    });
    posts.postChallenge(challengeName, challengeDescription, this.props.group.id, this.props.user.id)
      .then((responseJSON) => {
        this.props.challenges.push(responseJSON);
        this.setState({});
        this.goToChallenge(responseJSON);
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error});
      });
  }

  footer() {
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
            <Text>Create Challenge</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    var challenges = this.props.challenges;
    var list = challenges.map((item,index) => {
      var desc = challenges[index].name ? <Text style={styles.name}> {challenges[index].name} </Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight onPress={() => this.goToChallenge(item)}>
              <Text style={styles.nameText}>{challenges[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.challengeDescription}>{challenges[index].description}</Text>
          </View>
        </View>
      )
    });
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <ScrollView>{list}</ScrollView>
        <View style={{bottom: this.state.btnLocation}}>{this.footer()}</View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
  inputChallenge: {
    color: "black",
    height: 60,
    padding: 10,
    fontSize: 25,
    backgroundColor: 'white',
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  nameText: {
    color: '#4800a8',
    fontSize: 14,
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = GroupChallenges;
