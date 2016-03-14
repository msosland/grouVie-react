var React = require('react-native');
var User = require('./User');
var Login = require('./Login');
var Register = require('./Register');


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
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

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
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToLogin.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToRegister.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }

}
module.exports = Main;