var React = require('react-native');

var {
  View,
  Component,
  Text,
  Image,
  ListView,
  StyleSheet,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class ChallengePage extends Component {
  render(){
    // var participations = this.props.participations
    var participations = [{participant: 'mike', image_url: 'some_url.com'}, {participant: 'alana', image_url: 'another_url.com'}];

    var list = participations.map((item, index) => {
      return (
        <View key={index}>
          <View><Text>{participations[index].participant}</Text><Image source="{participations[index].image_url}" /></View></View>
          )
                // Something to press to trigger CameraRoll
                //       <TouchableHighlight
                //         onPress={this.openPage.bind(this, repos[index].html_url)}
                //         underlayColor='transparent'>
                //         <Text style={styles.name}>{repos[index].name}</Text>
                //       </TouchableHighlight>
                //       <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
                //       {desc}
    });
    return (
      <ScrollView>
        {list}
      </ScrollView>
      )
  }
};

  module.exports = ChallengePage;