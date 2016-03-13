'use strict';
var React = require('react-native');

var User = require('./App/Components/User');
var GroupPage = require('./App/Components/GroupPage');
var GroupMembers = require('./App/Components/GroupMembers');
var GroupChallenges = require('./App/Components/GroupChallenges');
var GroupComments = require('./App/Components/GroupComments');
var ChallengeShow = require('./App/Components/ChallengeShow');

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
    // console.log('in title function');
    // console.log(route.component);
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
      initialRoute={{component: User, props: {}}}
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
      //   initialRoute={{name: 'My First Scene', index: 0}}
      //   renderScene={(route, navigator) =>
      //     <User
      //       navigator={navigator}
      //       name={route.name}
      //       onForward={() => {
      //         var nextIndex = route.index + 1;
      //         navigator.push({
      //           name: 'Scene ' + nextIndex,
      //           index: nextIndex,
      //         });
      //       }}
      //       onBack={() => {
      //         if (route.index > 0) {
      //           navigator.pop();
      //         }
      //     }}/>
      // } />
