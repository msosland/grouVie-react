/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableHighlight,
// } from 'react-native';

// var Camera = require("react-native-camera");
// var GrouVieReact = React.createClass({
//     getInitialState: function() {
//         return {
//             cameraType: Camera.constants.Type.back
//         }
//     },

//     render: function() {
//         return (
//             <Camera
//                 ref="cam"
//                 style={styles.container}
//                 type={this.state.cameraType}>
//                 <View style={styles.buttonBar}>
//                     <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
//                         <Text style={styles.buttonText}>Flip</Text>
//                     </TouchableHighlight>
//                     <TouchableHighlight style={styles.button} onPress={this._takePicture}>
//                         <Text style={styles.buttonText}>Take</Text>
//                     </TouchableHighlight>
//                 </View>
//             </Camera>
//         );
//     },

//     _switchCamera: function() {
//         var state = this.state;
//         state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
//         this.setState(state);
//     },

//     _takePicture: function() {
//         this.refs.cam.capture(function(err, data) {
//             console.log(err, data);
//         });
//     }

// });

// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "transparent",
//     },
//     buttonBar: {
//         flexDirection: "row",
//         position: "absolute",
//         bottom: 25,
//         right: 0,
//         left: 0,
//         justifyContent: "center"
//     },
//     button: {
//         padding: 10,
//         // color: "#FFFFFF",
//         borderWidth: 1,
//         borderColor: "#FFFFFF",
//         margin: 5
//     },
//     buttonText: {
//         // color: "#FFFFFF"
//     }
// });

// AppRegistry.registerComponent('GrouVieReact', () => GrouVieReact);


import React from 'react-native';

const {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class GrouVieReact extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null
  };

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});

React.AppRegistry.registerComponent('GrouVieReact', () => GrouVieReact);