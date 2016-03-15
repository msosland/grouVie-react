'use strict';

var React = require('react-native');
var User = require('./User');
var ApiUtils = require('../Utils/ApiUtils');


var {
  Component,
  Text,
  TextInput,
  View,
  Navigator,
  StyleSheet,
  TouchableHighlight
} = React;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  };

  goToUser(user) {
    console.log("about to go to user profile page");
    this.props.navigator.push({
      component: User,
      passProps: {user}
    });
  }

  handleSubmit(){
    var username = this.state.username
    var password = this.state.password
    this.setState({
      username: '',
      password: ''
    });
    fetch("http://grouvie.herokuapp.com/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      body: JSON.stringify({
        username: username,
        password: password,
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
        <Text style={styles.loginText}> Username: </Text>
        <TextInput style={styles.blank} autoCapitalize='none' autoCorrect={false} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <Text style={styles.loginText}> Password: </Text>
        <TextInput style={styles.blank} autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <TouchableHighlight onPress={this.handleSubmit.bind(this)} style={styles.login}>
          <Text style={styles.loginButtonText}> Log In </Text>
        </TouchableHighlight>
      </View>
      );
  }
}

var styles = StyleSheet.create({
    container: {
    marginTop: 200,
    flex: 1
  },
  login: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 55,
    width: 100,
    margin: 10,
    borderRadius: 6,
  },
  loginText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  loginButtonText: {
    fontSize: 24,
    color: '#4800a8',
    alignSelf: 'center'
  },
  blank:{
    height: 40,
    width: 200,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  }
});


module.exports = Login;
