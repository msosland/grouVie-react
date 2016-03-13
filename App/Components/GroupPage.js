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
    marginTop: 65,
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
    console.log(this.props);
    this.state = {
      group: "hello"
    };
  }

  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }
  goToMembers(){
    console.log(this.props.groups);
    this.props.navigator.push({
      component: GroupMembers,
      passProps: {groups: this.props.groups }
    });
  }

  goToComments(){
    this.props.navigator.push({
      component: GroupComments,
      passProps: {groups: this.props.groups }
    });
  }

  goToChallenges(){
    this.props.navigator.push({
      component: GroupChallenges,
      passProps: { groups: this.props.groups }
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToMembers.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>View Members</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToComments.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>View Comments</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(2)}
            onPress={this.goToChallenges.bind(this)}
            underlayColor="#9BAAF3">
              <Text style={styles.buttonText}>View Challenges</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

// GroupPage.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

module.exports = GroupPage;
