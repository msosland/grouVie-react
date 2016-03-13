var React = require('react-native');
var posts = require('../Utils/posts');

const {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  View,
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
  input: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class GroupComments extends Component {
  constructor(props) {
    super(props);
    console.log("print");
    console.log(this.props);
    console.log(this.state);
    this.state = {
      username: '',
      image_url: '',
      comment: ''
    };
  }
  handleChange(e) {
    this.setState({
      comment: e.nativeEvent.text
    });
  }

  handleSubmit(){
    var comment = this.state.comment;
    console.log(comment);
    this.setState({
      comment: ''
    });
    // var url = "http://grouvie.herokuapp.com/groups/" + this.props.group.id + "/comments";
    posts.postComment(comment, this.props.group.id)
      .then((data) => {
        console.log(data);
        this.props.comments.push(data);
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
          style={styles.input}
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
        {list}
        {this.footer()}
      </ScrollView>
    )
  }
};

module.exports = GroupComments;
