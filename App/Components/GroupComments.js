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
      comment: '',
      commentObj: {},
      visibleHeight: Dimensions.get('window').height,
    };
    console.log(this.state.visibleHeight);
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({visibleHeight: newSize})
    console.log(this.state.visibleHeight);
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
    console.log(this.state.visibleHeight);
  }

  handleChange(e) {
    this.setState({
      comment: e.nativeEvent.text
    });
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
      <View style={styles.footer}>
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
          <View style={styles.rowContainer}>
            <Text style={styles.name}> {comments[index].username} </Text>
            <Text style={styles.comment}> {comments[index].content} </Text>
          </View>
        </View>
      )
    });
    return (
      <ScrollView style={styles.container}>
        <View style={{flex: 0.8}}>{list}</View>
        {this.footer()}
      </ScrollView>
    )
  }
};
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
  inputComment: {
    color: "black",
    height: 60,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'relative',
    flex: .2,
    marginTop: 20,
    left:0,
    right: 0,
    bottom: 30,
  }
});

module.exports = GroupComments;
