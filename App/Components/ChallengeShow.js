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
    top: 40,
    flex: 1,
    // backgroundColor: '#111111'
  },
});

class ChallengeShow extends Component {
  constructor(props) {
    super(props);
    console.log("print");
    console.log(this.props.challenge.participations);
    this.state = {
      username: '',
      image_url: ''
    };
  }
  render(){
    var participations = this.props.challenge.participations;
    var list = participations.map((item, index) => {
      return (
        <View key={index}>
          <View><Text>{participations[index].username}</Text><Image source="{participations[index].image_url}" /></View></View>
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
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
      )
  }
};

  module.exports = ChallengeShow;
