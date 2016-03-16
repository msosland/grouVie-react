var React = require('react-native');
var GroupMembers = require('./GroupMembers');
var GroupComments = require('./GroupComments');
var GroupChallenges = require('./GroupChallenges');

var {
  Component,
  Text,
  View,
  Navigator,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;


class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: "hello",
      btnLocation: 0,
    };
  }

  makeBackground(btn){
    var obj = {
      borderRadius: 6,
      justifyContent: 'center',
      padding: 20,
    }
    if(btn === 0){
      obj.alignSelf = 'flex-start';
      obj.backgroundColor = '#0A8BE5';
      obj.margin = 10;
    } else if (btn === 1){
      obj.margin = 10;
      obj.alignSelf = 'flex-end';
      obj.backgroundColor = '#0A8BE5';
    } else {
      obj.margin = 10;
      obj.alignSelf = 'flex-start';
      obj.backgroundColor = '#0A8BE5';
    }
    return obj;
  }
  goToMembers(){
    this.props.navigator.push({
      component: GroupMembers,
      passProps: {members: this.props.group.members, user: this.props.user, group: this.props.group }
    });
  }

  goToComments(){
    this.props.navigator.push({
      component: GroupComments,
      passProps: {
        comments: this.props.group.comments,
        group: this.props.group,
        user: this.props.user
       }
    });
  }

  goToChallenges(){
    this.props.navigator.push({
      component: GroupChallenges,
      passProps: { challenges: this.props.group.challenges, user: this.props.user, group: this.props.group }
    });
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableHighlight
            style={this.makeBackground(2)}
            onPress={this.goToChallenges.bind(this)}
            underlayColor="#9BAAF3">
              <Text style={styles.buttonText}>Challenges</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToComments.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>Chat Room</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToMembers.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Members</Text>
          </TouchableHighlight>
        </View>
        <View style={{bottom: this.state.btnLocation, backgroundColor: '#4800a8'}}>
          <Text style={styles.buttonText}>{this.props.group.name}</Text>
        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    flex: 1,
    backgroundColor: 'white'
  },
  footyText: {
    color: 'white',
    fontSize: 35,
    margin: 10
  },
  buttonText: {
    fontSize: 35,
    color: 'white',
    padding: 10,
    alignSelf: 'center'
  }
});

module.exports = GroupPage;
