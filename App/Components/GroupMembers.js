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

var styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  image: {
    width: 12,
    height: 12
  },
  imageSquare: {
    width: 12,
    height: 12
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  inputComment: {
    color: "black",
    height: 60,
    padding: 10,
    fontSize: 18,
    backgroundColor: 'yellow',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    // position: 'relative',
    flex: .2,
    marginTop: 50,
    left:0,
    right: 0,
    bottom: 30,
  }
});

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
    var profilePic = members[index].image_url ? <Image style={styles.image} source={{uri: members[index].image_url}} /> : <Text style={styles.imageSquare}> No Picture yet </Text>;
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

module.exports = GroupMembers;
