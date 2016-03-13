import React from 'react-native';

const {
  StyleSheet,
  ScrollView,
  Text,
  Component,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
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
});

class GroupComments extends Component {
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
    var comments = this.props.comments;
    // var comments = [{user: "Mike", content: "Hello"},{user: "Lauren", content: "Hi"}]
    var list = comments.map((comment, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.name}> {comments[index].user} </Text>
            <Text style={styles.comment}> {comments[index].content} </Text>
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

module.exports = GroupComments;
