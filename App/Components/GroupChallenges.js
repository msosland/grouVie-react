var React = require('react-native');
var ChallengeShow = require('./ChallengeShow');
var CreateChallenge = require('./CreateChallenge');
var posts = require('../Utils/posts');
var Icon = require('react-native-vector-icons/FontAwesome');


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
        user: this.props.user,
        refreshChallenges: this.getChallenges.bind(this)
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

  challengeStatusIcon(challenge) {
    var statusIcon = <Icon name="check" color="gray" style={{fontSize: 30}}/>;

    for (var i=0;i < challenge.participations.length; i++) {
      if (challenge.participations[i].user_id === this.props.user.id && challenge.participations[i].completed === true) {
        return <Icon name="check-circle-o" color="green" style={{fontSize: 60}}/>;
      }
      else if (challenge.participations[i].user_id === this.props.user.id) {
        return <Icon name="circle-o" color="#c3c3c3" style={{fontSize: 60}}/>;
      }
      else {
        statusIcon = '';
      }
    }
  }

  renderRow(challenge) {
    return (
      <View >
          <TouchableHighlight onPress={() => this.goToChallenge(challenge)} underlayColor="#B3B6BF">
            <View style={styles.rowContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.name}>{challenge.name}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <Text style={styles.challengeDate}>{new Date(challenge.start_date).toDateString().substr(0,10) + " - " + new Date(challenge.end_date).toDateString().substr(0,10)}</Text>
              </View>
              <Text style={styles.statusIcon}>{this.challengeStatusIcon(challenge)}</Text>
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
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  statusIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  name: {
    fontSize: 25,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#444444'
  },
  challengeDescription: {
    color: '#444444',
    fontSize: 18,
    textAlign: 'left',
  },
  challengeDate: {
    color: '#444444',
    fontSize: 12,
    textAlign: 'left',
  },
  button: {
    height: 60,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30
  },
});

module.exports = GroupChallenges;
