var React = require('react-native');
var posts = require('../Utils/posts');


var {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Component,
  Image,
} = React;


class GroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image_url: ''
    };
  }

  handleChange(e) {
    this.setState({
      memberToAdd: e.nativeEvent.text
    });
  }

  handleSubmit(){
    var memberToAdd = this.state.memberToAdd;
    this.setState({
      memberToAdd: ''
    });
    posts.addMemberToGroup(memberToAdd, this.props.group.id)
      .then((data) => {
        this.props.members.push(data);
        this.setState({});
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error});
      });
  }

  footer() {
    return (
      <View style={styles.footer}>
        <TextInput
          style={styles.inputComment}
          value={this.state.memberToAdd}
          autoCapitalize='none' autoCorrect={false}
          onChange={this.handleChange.bind(this)}
          placeholder="Enter username" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5">
            <Text>Add to Group</Text>
        </TouchableHighlight>
      </View>
    )
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
        {this.footer()}
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

