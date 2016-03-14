'use strict';

var React = require('react-native');
// var User = require('./User');
// var ApiUtils = require('../Utils/ApiUtils');
// require nextpage component


var {
  Component,
  Text,
  TextInput,
  View,
  Navigator,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
    container: {
    marginTop: 55,
    flex: 1
  },
});

class GroupCreate extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      groupName: '',
      groupMembers: [],
      numUsers: 1
    }
  };

  // goToUser(user) {
  //   console.log(user);
  //   this.props.navigator.push({
  //     component: User,
  //     passProps: {user}
  //   });
  // }

  handleSubmitGroup(){
    fetch("http://grouvie.herokuapp.com/groups", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        })
 })
    .then(ApiUtils.checkStatus)
    .then((response) => response.json())
    .then((response) => {
      this.goToUser(response);
    })
    .catch(error => error)

}

  render() {
    return (
      <View style={styles.container}>
        <Text> Group Name: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' autoCorrect='false' onChangeText={(groupName) => this.setState({groupName})} value={this.state.groupName}/>

          // add new users field
        <Text> Add Users: </Text>
        for (var i = 0; i < this.props.numUsers; i++) {
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        }

        <TouchableHighlight onPress={this.props.numUsers++}>
          <Text> Add More Users </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.handleSubmitGroup.bind(this)}>
          <Text> Log In </Text>
        </TouchableHighlight>
      </View>
      );
  }
}

module.exports = GroupCreate;
