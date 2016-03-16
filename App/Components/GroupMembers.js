var React = require('react-native');
var posts = require('../Utils/posts');
var Swiper = require('react-native-swiper')


var {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Component,
  Image,
  DeviceEventEmitter
} = React;

var renderPagination = function (index, total, context) {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10,
    }}>
      <Text><Text style={{
        color: '#007aff',
        fontSize: 20,
      }}>{index + 1}</Text>/{total}</Text>
    </View>
  )
}


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

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    this.setState({btnLocation: e.endCoordinates.height})
  }

  keyboardWillHide (e) {
    this.setState({btnLocation: 0})
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
            <Text style={styles.buttonText}>Add to Group</Text>
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
        <Swiper style={styles.wrapper} height={480} renderPagination={renderPagination} paginationStyle={{bottom: -23, left: null, right: 10}} loop={false}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)} />
          </Swiper>
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
    justifyContent: 'center',
    textAlign: 'center',
    height: 48,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
  },
  button: {
    height: 48,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 22
  },
    wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  }

});

module.exports = GroupMembers;

