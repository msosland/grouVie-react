
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
      dataSource: ds.cloneWithRows(this.props.challenges)
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

  // componentDidMount() {
  //   this.getChallenges(this.props.group.id);
  // }

  componentWillUnmount() {
    this.listener.remove();
    this.listenerTwo.remove();
  }

  componentWillMount () {
    this.listener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.listenerTwo = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    this.getChallenges(this.props.group.id);
  }

  keyboardWillShow (e) {
    this.setState({btnLocation: e.endCoordinates.height})
  }

  keyboardWillHide (e) {
    this.setState({btnLocation: 0})
  }


  handleSubmit() {
    this.props.navigator.push({
      component: CreateChallenge,
      passProps: { startDate: new Date(), endDate: new Date(), challenges: this.props.group.challenges, user: this.props.user, group: this.props.group, refreshChallenges: this.getChallenges.bind(this)}
    });
  }

  getChallenges() {
    console.log("getting called");
    fetch("http://localhost:3000/groups/" + this.props.group.id + "/challenges")
      .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true
        });
      })
      .done();
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

  renderRow(challenge) {
    return (
      <View >
        <View style={styles.rowContainer}>
            <TouchableHighlight onPress={() => this.goToChallenge(challenge)} underlayColor="#9BAAF3">
              <Text style={styles.name}>{challenge.name}</Text>
              </TouchableHighlight>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            <Text style={styles.challengeDescription}>{challenge.created_at}</Text>
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
    margin: 5,
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
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  challengeDescription: {
    color: 'black',
    fontSize: 15,
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
