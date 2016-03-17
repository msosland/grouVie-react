'use strict'

var React = require('react-native');
var posts = require('../Utils/posts');

const {
  Component,
  Heading,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  DeviceEventEmitter
} = React;

class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeName: '',
      challengeDescription: '',
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
  }

  componentWillUnmount() {
    this.listener.remove();
    this.listenerTwo.remove();
  }

  componentWillMount () {
    this.listener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.listenerTwo = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
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
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;

    if (challengeName !== '' && startDate < endDate) {
      this.setState({
          btnLocation: 0,
          challengeName: '',
          challengeDescription: '',
          startDate: new Date(),
          endDate: new Date(),
        });
        posts.postChallenge(challengeName, challengeDescription, startDate, endDate, this.props.group.id, this.props.user.id)
          .then((responseJSON) => {
            this.props.refreshChallenges();
            this.props.navigator.pop();
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

  addNewChallengeForm() {
    return (
      <View style={styles.challengeForm}>
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

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.dates}>
      <Text style={styles.headings}>Start Date</Text>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.startDate}
          mode="date"
          onDateChange={this.onStartDateChange.bind(this)}/>
        <Text style={styles.headings}>End Date</Text>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.endDate}
          mode="date"
          onDateChange={this.onEndDateChange.bind(this)}/></View>
          <View style={{bottom: this.state.btnLocation}}>{this.addNewChallengeForm()}</View>
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
  challengeDescription: {
    color: 'black',
    fontSize: 15,
  },
  challengeForm: {
    borderTopColor: '#c3c3c3',
    borderTopWidth: 1
  },
  dates: {
    padding: 0,
    height: 430,
  },
  datePicker: {
    textAlign: 'center',
    alignItems: 'center',
  },
  headings: {
    padding: 0,
    fontSize: 25,
    alignSelf: 'center',
  },
  inputChallenge: {
    color: "black",
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  rowContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
});

module.exports = CreateChallenge;
