'use strict'

var React = require('react-native');
var posts = require('../Utils/posts');
import TimerMixin from 'react-timer-mixin';
const {
  Component,
  Heading,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeName: '',
      challengeDescription: '',
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      // timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
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


  handleSubmit() {
    var challengeName = this.state.challengeName;
    var challengeDescription = this.state.challengeDescription;
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;

    if (challengeName !== '' && startDate < endDate) {
      this.setState({
          challengeName: '',
          challengeDescription: '',
          startDate: new Date(),
          endDate: new Date(),
        });
        posts.postChallenge(challengeName, challengeDescription, startDate, endDate, this.props.group.id, this.props.user.id)
          .then((responseJSON) => {
            this.props.refreshChallenges();
            console.log("will you hit");
            this.props.navigator.pop();
            console.log("no way you hit");
          })
          .catch((error) => {
            console.log("error");
            console.log('Request failed', error);
            this.setState({error});
          });
    }
  }

  onStartDateChange(date) {
    this.setState({startDate: date});
  }

  onEndDateChange(date) {
    this.setState({endDate: date});
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.headings}>Start Date</Text>
        <DatePickerIOS
          date={this.state.startDate}
          mode="date"
          onDateChange={this.onStartDateChange.bind(this)}/>
        <Text style={styles.headings}>End Date</Text>
        <DatePickerIOS
          date={this.state.endDate}
          mode="date"
          onDateChange={this.onEndDateChange.bind(this)}/>
          {this.addNewChallengeForm()}
        </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
    height: 50,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
    marginTop: 2
  },
  challengeDescription: {
    color: 'black',
    fontSize: 15,
  },
  button: {
    height: 50,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30
  },
});

module.exports = CreateChallenge;
