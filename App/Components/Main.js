var React = require('react-native');
var User = require('./User');
var Login = require('./Login');
var Register = require('./Register');


var {
  Component,
  Text,
  TextInput,
  View,
  Image,
  Navigator,
  StyleSheet,
  TouchableHighlight
} = React;

class Main extends Component {
  goToLogin() {
    this.props.navigator.push({
      component: Login
    });
  }
  goToRegister() {
    this.props.navigator.push({
      component: Register
    });
  }
  makeBackground(btn){
    var obj = {
      alignSelf: 'center',
      justifyContent: 'center',
      height: 55,
      width: 200,
      margin: 10,
      borderRadius: 6,
    }
    if(btn === 0){
      obj.backgroundColor = '#ffffff';
    } else if (btn === 1){
      obj.backgroundColor = '#ffffff';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }

  render(){
    return (
      <View style={styles.container}>
        <Image
        resizeMode={"contain"}
        style={styles.image}
        source={require('../assets/darkcon.png')} />
        <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToLogin.bind(this)}
            underlayColor="#6d00ff">
              <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToRegister.bind(this)}
            underlayColor="#4800a8">
              <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    // marginTop: 55,
    flex: 1
  },
  image: {
    height: 155,
    alignSelf: 'center',
    margin: 100,

  },
  buttonText: {
    fontSize: 24,
    color: '#5a01d2',
    alignSelf: 'center'
  }
});

module.exports = Main;
