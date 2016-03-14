
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

var styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
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
    fontSize: 14,
    paddingBottom: 5,
  },
  input: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class GroupChallenges extends Component {
  constructor(props) {
    super(props);
    console.log("print");
    console.log(this.props);
    this.state = {
      challengeName: '',
      challengeDescription: '',
    };
  }

  goToChallenge(challenge) {
    this.props.navigator.push({
      component: ChallengeShow,
      passProps: {challenge, user: this.props.user}
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
      <View>
        <TextInput
          style={styles.input}
          value={this.state.challengeName}
          onChangeText={(challengeName) => this.setState({challengeName})}
          placeholder="Challenge Name" />
        <TextInput
          style={styles.input}
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

module.exports = GroupChallenges;
