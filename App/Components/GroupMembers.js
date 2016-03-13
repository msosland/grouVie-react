var React = require('react-native');

var {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Component,
  Image,
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

class GroupMembers extends Component {
  constructor(props) {
    super(props);
    console.log("print");
    console.log(this.props);
    this.state = {
      username: '',
      image_url: ''
    };
  }

  render(){
    var list = members.map((member, index) => {
      var profilePic = members[index].image_url ? <Image style={styles.image} source={members[index].image_url} /> : <Text style={styles.imageSquare}> No Picture yet </Text>;
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
