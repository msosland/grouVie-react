var React = require('react-native');
var posts = require('../Utils/posts');


var {
  StyleSheet,
  ListView,
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
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      username: '',
      image_url: '',
      btnLocation: 0,
      dataSource: ds.cloneWithRows(this.props.members)
    };
  }

  handleChange(e) {
    this.setState({
      memberToAdd: e.nativeEvent.text
    });
  }

  handleSubmit(){
    var memberToAdd = this.state.memberToAdd;
    if (memberToAdd !== '') {
      this.setState({
          memberToAdd: ''
        });
        posts.addMemberToGroup(memberToAdd, this.props.group.id)
          .then((responseJSON) => {
            this.props.members.push(responseJSON);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.props.members)
            });
          })
          .catch((error) => {
            console.log('Request failed', error);
            this.setState({error});
          });
        }
  }

  addNewMemberForm() {
    return (
      <View style={styles.addNewMemberForm}>
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

  renderRow(member) {
    var profilePic = member.image_url ? <Image style={styles.image} source={{uri:member.image_url}} /> : <Text style={styles.imageSquare}> No Picture yet </Text>;
    return (
      <View >
        <View style={styles.rowContainer}>
          {profilePic}
          <Text style={styles.name}> {member.username} </Text>
        </View>
      </View>
    );
  }

 render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        <View style={{bottom: this.state.btnLocation}}>{this.addNewMemberForm()}</View>
      </View>
      )
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#4800a8',
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
  inputComment: {
    color: "black",
    height: 60,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = GroupMembers;

