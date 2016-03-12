'use strict';
import React from 'react-native';
// var NativeImagePicker = require('./App/Components/NativeImagePicker');
var GroupChallenges = require('./App/Components/GroupChallenges');


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
  render() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <GroupChallenges
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
          }}/>
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