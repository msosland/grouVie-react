var React = require('react-native');
var ChallengeShow = require('./ChallengeShow');
var CreateChallenge = require('./CreateChallenge');
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


  handleSubmit() {
    this.props.navigator.push({
      component: CreateChallenge,
      passProps: { startDate: new Date(), endDate: new Date(), challenges: this.props.group.challenges, user: this.props.user, group: this.props.group, refreshChallenges: this.getChallenges.bind(this)}
    });
  }

  getChallenges() {
    fetch("http://grouvie.herokuapp.com/groups/" + this.props.group.id + "/challenges")
      .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true
        });
      })
      .done();
  }

  addNewChallengeButton() {
    return (
      <View>
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
          <TouchableHighlight onPress={() => this.goToChallenge(challenge)} underlayColor="#B3B6BF">
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.name}>{challenge.name}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <Text style={styles.challengeDate}>{new Date(challenge.start_date).toDateString().substr(0,10) + " - " + new Date(challenge.end_date).toDateString().substr(0,10)}</Text>
              </View>
            </View>
          </TouchableHighlight>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        <View>{this.addNewChallengeButton()}</View>
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
