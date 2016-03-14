'use strict';
var React = require('react-native');

var Login = require('./App/Components/Login');
var User = require('./App/Components/User');
var GroupPage = require('./App/Components/GroupPage');
var GroupMembers = require('./App/Components/GroupMembers');
var GroupChallenges = require('./App/Components/GroupChallenges');
var GroupComments = require('./App/Components/GroupComments');
var ChallengeShow = require('./App/Components/ChallengeShow');
var Main = require('./App/Components/Main');
var Register = require('./App/Components/Register');

var NavigationBarRouteMapper = {
  LeftButton: function( route, navigator, index, navState ){
    if (index === 0) {
      return null;
    }
    return(
      <Text onPress={() => navigator.pop()}>Back</Text>
    )
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text>Title</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
    if (index === 0) {
      return null;
    }
    return(
      <Text></Text>
    )
  }
};

const {
  StyleSheet,
  Text,
  View,
  Component,
  PixelRatio,
  TouchableOpacity,
  Image,
  Navigator,
  AppRegistry,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class GrouVieReact extends Component {

  renderScene(route, navigator) {
    if (route.component == Main) {
      return <Main {...route.passProps} navigator={navigator} title={"Main"} leftButton={"Back"}  />
    }
    if (route.component == Register) {
      return <Register {...route.passProps} navigator={navigator} title={"Register"} leftButton={"Back"}  />
    }
    if (route.component == Login) {
      return <Login {...route.passProps} navigator={navigator} title={"Login"} leftButton={"Back"}  />
    }
    if (route.component == User) {
      return <User {...route.passProps} navigator={navigator} title={"Profile Page"} leftButton={"Back"}  />
    }
    if (route.component == GroupPage) {
      return <GroupPage {...route.passProps} navigator={navigator}  title={"Group Name"} leftButton={"Back"}  />
    }
    if (route.component == GroupMembers) {
      return <GroupMembers {...route.passProps} navigator={navigator}  title={"Group Members"} leftButton={"Back"}  />
    }
    if (route.component == GroupChallenges) {
      return <GroupChallenges {...route.passProps} navigator={navigator}  title={"Group Challenges"} leftButton={"Back"}  />
    }
    if (route.component == GroupComments) {
      return <GroupComments {...route.passProps} navigator={navigator}  title={"Group Comments"} leftButton={"Back"}  />
    }
    if (route.component == ChallengeShow) {
      return <ChallengeShow {...route.passProps} navigator={navigator}  />
    }
  }

  render() {
    return (
      <Navigator
      style={{flex:1}}
      initialRoute={{component: Main, props: {}}}
      renderScene={this.renderScene}
      navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: 'pink', height: 45}}
            routeMapper={ NavigationBarRouteMapper } />
        } />
    );
  }
};


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});


React.AppRegistry.registerComponent('GrouVieReact', () => GrouVieReact);