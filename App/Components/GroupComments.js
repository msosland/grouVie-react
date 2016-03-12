import React from 'react-native';

const {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Navigator,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  NativeModules: {
    ImagePickerManager
  }
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  comment: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
});

class GroupComments extends React.component{
  render(){
    var comments = this.props.comments;
    var list = comments.map((comment, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.name}> {comments[index].user} </Text>
            <Text style={styles.comment}> {comments[index].content} </Text>
          </View>
        </View>
      )
    });
    return (
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
    )
  }
};

module.exports = GroupComments;