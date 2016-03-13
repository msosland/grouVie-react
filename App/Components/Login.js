'use strict';

var React = require('react-native');

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
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(JSON.stringify({
        email: 'alana@mail.com',
        password: 'password',
      }))
    fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then((response) => response.json()) //responseData
      .then((responseData) => {
        console.log(responseData);
        // .then((responseData) => this.handleResponse(responseData))
        // this.setState({
        //   email
        // })
      })
      .catch((error) => {
        console.warn(error);
      });
}

  render() {
    return (
      <View style={styles.container}>
        <Text> Email Address: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' onChangeText={(email) => this.setState({email})} value={this.state.email}/>
        <Text> Password: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <TouchableHighlight onPress={this.handleSubmit.bind(this)}>
          <Text> Log In </Text>
        </TouchableHighlight>
      </View>
      );
  }
}

module.exports = Login;
