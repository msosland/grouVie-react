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


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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
    fetch("http://grouvie.herokuapp.com/users", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
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
        <Text style={styles.registerText}> Username: </Text>
        <TextInput style={styles.blank} autoCapitalize='none' autoCorrect={false} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
        <Text style={styles.registerText}> E-mail: </Text>
        <TextInput
          style={styles.blank} autoCapitalize='none' autoCorrect={false} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
        <Text style={styles.registerText}> Password: </Text>
        <TextInput
          style={styles.blank} autoCapitalize='none' secureTextEntry={true} autoCorrect={false} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <TouchableHighlight  style={styles.register} onPress={this.handleSubmit.bind(this)}>
          <Text  style={styles.registerButtonText}> Create User </Text>
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
  register: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 55,
    width: 150,
    margin: 10,
    borderRadius: 6,
  },
  registerText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  registerButtonText: {
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

module.exports = Register;
