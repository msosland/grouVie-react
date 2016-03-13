'use strict';

import React from 'react-native';
// var NativeImagePicker = require('./App/Components/NativeImagePicker');
var User = require('./App/Components/User');
var GroupPage = require('./App/Components/GroupPage');
var GroupMembers = require('./App/Components/GroupMembers');
var GroupChallenges = require('./App/Components/GroupChallenges');
var GroupComments = require('./App/Components/GroupComments');
// var ChallengeShow = require('./App/Components/ChallengeShow');
// var GroupChallenges = require('./App/Components/GroupChallenges');

const {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Navigator,
  AppRegistry,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class GrouVieReact extends React.Component {
  renderScene(route, navigator) {
    if (route.component == User) {
      return <User navigator={navigator} {...route.passProps} />
    }
    if (route.component == GroupPage) {
      return <GroupPage navigator={navigator} {...route.passProps} />
    }
    if (route.component == GroupMembers) {
      return <GroupMembers navigator={navigator} {...route.passProps} />
    }
    if (route.component == GroupChallenges) {
      return <GroupChallenges navigator={navigator} {...route.passProps} />
    }
    if (route.component == GroupComments) {
      return <GroupComments navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator style={{flex:1}} initialRoute={{component: User}} renderScene={this.renderScene} />

    )
  }
};


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});


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

React.AppRegistry.registerComponent('GrouVieReact', () => GrouVieReact);
