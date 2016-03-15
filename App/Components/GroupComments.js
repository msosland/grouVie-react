var React = require('react-native');
var posts = require('../Utils/posts');

const {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Component,
  View,
  DeviceEventEmitter
} = React;

class GroupComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image_url: '',
      btnLocation: 0,
      comment: '',
      commentObj: {}
    }
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
      comment: e.nativeEvent.text
    });
  }

  checkName(user){
    var obj = {
      flexDirection:'column',
      flex: 1,
      borderRadius: 6,
      padding: 10,
      width: 300,
      justifyContent: 'center',
    }
    if(user === this.props.user.username){
      obj.alignSelf = 'flex-start';
      obj.backgroundColor = '#4800a8';
      obj.margin = 10;
    } else {
      obj.margin = 10;
      obj.alignSelf = 'flex-end';
      obj.backgroundColor = '#6d00ff';
    }
    return obj;
  }
  handleSubmit(){
    var comment = this.state.comment;
    this.setState({
      comment: ''
    });


    posts.postComment(comment, this.props.group.id, this.props.user.id)
      .then((data) => {
        this.props.comments.push(data);
        this.setState({});
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error});
      });
  }

  footer() {
    return (
      <View>
        <TextInput
          style={styles.inputComment}
          value={this.state.comment}
          onChange={this.handleChange.bind(this)}
          placeholder="New Comment" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5">
            <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
  render(){
    var comments = this.props.comments;
    var list = comments.map((comment, index) => {
      return (
        <View key={index}>
          <View style={this.checkName(comments[index].username)}>
          <Text style={styles.comment}> {comments[index].content} </Text>
            <Text style={styles.name}> ~ {comments[index].username} </Text>

          </View>
        </View>
      )
    });
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <ScrollView>{list}</ScrollView>
        <View style={{bottom: this.state.btnLocation}}>{this.footer()}</View>
      </View>
    )
  }
};
var styles = StyleSheet.create({
  name: {
    fontSize: 18,
    color: 'white',
    paddingBottom: 5
  },
  comment: {
    color: 'white',
    fontSize: 25,
    paddingBottom: 5
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
  },
});

module.exports = GroupComments;
