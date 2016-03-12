var React = require('react-native');
var GroupMembers = require('./GroupMembers');
var GroupComments = require('./GroupComments');
var GroupChallenges = require('./GroupChallenges');
var groupCalls = require('../Utils/groupCalls');

var {
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

class GroupPage extends React.Component{
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
    groupCalls.getMembers(this.props.group)
      .then((jsonRes) => {
        this.props.navigator.push({
          component: GroupMembers,
          title: 'Group Members',
          passProps: {members: jsonRes }
        });
      })
  }
  goToComments(){
    groupCalls.getComments(this.props.group)
      .then((jsonRes) => {
        this.props.navigator.push({
          component: GroupComments,
          title: "Group Comments",
          passProps: { comments: jsonRes }
        });
      })
  }
  goToChallenges(){
    groupCalls.getChallenges(this.props.group)
      .then((jsonRes) => {
        jsonRes = jsonRes || {};
        this.props.navigator.push({
          component: GroupChallenges,
          title: 'Challenges',
          passProps: { challenges: jsonRes }
        });
      })
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
              <Text style={styles.buttonText}>Take Challenges</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

Dashboard.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = GroupPage;