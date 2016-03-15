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

var styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: "hello"
    };
  }

  makeBackground(btn){
    var obj = {
      flexDirection:'column',
      height: 150,
      width: 150,
      borderRadius: 75,
      justifyContent: 'center',
    }
    if(btn === 0){
      obj.alignSelf = 'flex-start';
      obj.backgroundColor = '#48BBEC';
      obj.marginLeft = 10;
    } else if (btn === 1){
      obj.marginRight = 10;
      obj.alignSelf = 'flex-end';
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.marginLeft = 10;
      obj.alignSelf = 'flex-start';
      obj.backgroundColor = '#758BF4';
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
      <View style={styles.container}>
        <TouchableHighlight
            style={this.makeBackground(2)}
            onPress={this.goToChallenges.bind(this)}
            underlayColor="#9BAAF3">
              <Text style={styles.buttonText}>View Challenges</Text>
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
              <Text style={styles.buttonText}>View Members</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

// GroupPage.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

module.exports = GroupPage;
