var React = require('react-native');

var {
  View,
  Component,
  Text,
  Image,
  ListView,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class ChallengePage extends Component
  render(){
    var participations = this.props.participations
    var list = participations.map((item, index) => {

      return (
        <View key={index}>
          <View style={}>
                <Text>{participations[index].participant} </Text>

                <Image source={{participations[index].image_url}} />
                // Something to press to trigger CameraRoll
      //       <TouchableHighlight
      //         onPress={this.openPage.bind(this, repos[index].html_url)}
      //         underlayColor='transparent'>
      //         <Text style={styles.name}>{repos[index].name}</Text>
      //       </TouchableHighlight>
      //       <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
      //       {desc}
          </View>
        </View>
      // )
        )
    });
    return (
      <Scrollview>
        {list}
      </Scrollview>
      )
  }

  module.exports = ChallengePage;