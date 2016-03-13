var React = require('react-native');
var GroupMembers = require('./GroupMembers');
var GroupComments = require('./GroupComments');
var GroupChallenges = require('./GroupChallenges');
var groupCalls = require('../Utils/groupCalls');

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
    console.log("****************")
    console.log(this.props.groups);
    this.props.navigator.push({
      component: GroupMembers,
          // title: 'Group Members',
          passProps: {members: jsonRes }
    });
  }

  goToComments(){
        this.props.navigator.push({
          component: GroupComments,
          // title: "Group Comments",
          passProps: {}
        });
  }

  goToChallenges(){
    // groupCalls.getChallenges(this.props.group)
    //   .then((jsonRes) => {
    //     jsonRes = jsonRes || {};
      this.props.navigator.push({
        component: GroupChallenges
        // title: 'Challenges',
        // passProps: { challenges: jsonRes }
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
