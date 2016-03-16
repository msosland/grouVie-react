var React = require('react-native');
var posts = require('../Utils/posts');

const {
  StyleSheet,
  ScrollView,
  ListView,
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
    var ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
    this.state = {
      username: '',
      image_url: '',
      btnLocation: 0,
      comment: '',
      loaded: false,
      dataSource: ds.cloneWithRows(this.props.comments)
    }
  }

  componentDidMount() {
    setInterval( () => {
      this.fetchComments();
    }, 1000);
  }

  fetchComments() {
    fetch("http://localhost:3000/groups/" + this.props.group.id + "/comments")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
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
    if (comment !== '') {
      this.setState({
        comment: ''
      });
      posts.postComment(comment, this.props.group.id, this.props.user.id)
        .then((responseJSON) => {
          this.props.comments.push(responseJSON);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.props.comments)
            });
        })
        .catch((error) => {
          console.log('Request failed', error);
          this.setState({error});
        });
    }
  }

  addCommentForm() {
    return (
      <View>
        <TextInput
          style={styles.inputComment}
          value={this.state.comment}
          autoCapitalize='none'
          autoCorrect={false}
          onChange={this.handleChange.bind(this)}
          placeholder="New Comment" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderRow(comment) {
    return (
        <View >
          <View style={this.checkName(comment.username)}>
            <Text style={styles.comment}> {comment.content} </Text>
            <Text style={styles.name}> ~ {comment.username} </Text>
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
        <View style={{bottom: this.state.btnLocation}}>{this.addCommentForm()}</View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
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
    margin: 10,
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    color: "black",
    height: 60,
    padding: 10,
    fontSize: 25,
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    backgroundColor: '#4800a8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    color: 'white',
    fontSize: 35,
    margin: 10
  }
});

module.exports = GroupComments;
