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
  image: {
    width: 150,
    height: 150
  },
  imageSquare: {
    width: 150,
    height: 150
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
});

class GroupMembers extends React.component{
  render(){
    var members = this.props.members;
    var list = members.map((member, index) => {
      var profilePic = members[index].image_url ? <Image style={styles.image} source={{members[index].image_url}}/> : <Text style={styles.imageSquare}> No Picture yet </Text>;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            {profilePic}
            <Text style={styles.name}> {members[index].username} </Text>
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

module.exports = GroupMembers;