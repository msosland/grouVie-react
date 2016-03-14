'use strict';

var React = require('react-native');
var User = require('./User');

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  };

  goToUser(user) {
    this.props.navigator.push({
      component: User,
      passProps: {user}
    });
  }

  handleSubmit(){
    fetch("http://grouvie.herokuapp.com/login", {
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
    .then((response) => response.json())
    .then((response) => {
      this.goToUser(response);
    })
    .catch((error) => {
      console.warn(error);
    })

}

  render() {
    return (
      <View style={styles.container}>
        <Text> Username: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <Text> Password: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <TouchableHighlight onPress={this.handleSubmit.bind(this)}>
          <Text> Log In </Text>
        </TouchableHighlight>
      </View>
      );
  }
}

module.exports = Login;
