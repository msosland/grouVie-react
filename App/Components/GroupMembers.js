var React = require('react-native');
var posts = require('../Utils/posts');
var Swiper = require('react-native-swiper')


var {
  StyleSheet,
  ScrollView,
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
    this.state = {
      username: '',
      image_url: ''
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
            <Text style={styles.buttonText}>Add to Group</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render(){
    var members = this.props.members;
    var list = members.map((member, index) => {
    var profilePic = members[index].image_url ? <Image style={styles.image} source={{uri:members[index].image_url}} /> : <Text style={styles.imageSquare}> No Picture yet </Text>;

      return (
        <View key={index} style={styles.slide} title={<Text style={styles.text}>{members[index].username} </Text>}>
            {profilePic}
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={480} renderPagination={renderPagination} paginationStyle={{
            bottom: -23, left: null, right: 10}} loop={false}>
        {list}</Swiper>
        <View style={{bottom: this.state.btnLocation}}>{this.footer()}</View>
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
    marginTop: 2
  },
  button: {
    height: 48,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 30
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
