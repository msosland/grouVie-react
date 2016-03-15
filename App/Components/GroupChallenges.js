
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
} = React;


class GroupChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeName: '',
      challengeDescription: '',
    };
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
      <View style={styles.footer}>
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
      <ScrollView style={styles.container}>
        {list}
        {this.footer()}
      </ScrollView>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',

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
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  nameText: {
    color: '#4800a8',
    fontSize: 14,
  },
  input: {
    height: 60,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'relative',
    flex: .2,
    marginTop: 50,
    paddingTop: 5,
    left:0,
    right: 0,
    bottom: 30,
  }
});

module.exports = GroupChallenges;
