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
    var members = this.props.members;
    var list = members.map((member, index) => {
    var profilePic = members[index].image_url ? <Image style={styles.image} source={{uri:members[index].image_url}} /> : <Text style={styles.imageSquare}> No Picture yet </Text>;
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

var styles = StyleSheet.create({
  container: {
    top: 40,
    marginTop: 45,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imageSquare: {
    width: 150,
    height: 150
  },
  name: {
    flex: 3,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 35
  },
});

module.exports = GroupMembers;
