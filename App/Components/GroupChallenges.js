
var React = require('react-native');

var {
	StyleSheet,
	Navigator,
	TouchableHighlight,
	ScrollView,
	View,
	Component,
	Text,
} = React;

var styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  nameText: {
    fontSize: 14,
    paddingBottom: 5,
  }
});

class GroupChallenges extends Component {
	constructor(props) {
		super(props);
		this.state = {
			challengeName: '',
		};
	}

	render() {
		// var challenges = this.props.challenges;
		var challenges = [{name: "Do the dishes", description: "Well"}, {name: "Clean the fridge", description: "Well"}];
		var list = challenges.map((item,index) => {
			var desc = challenges[index].name ? <Text style={styles.name}> {challenges[index].name} </Text> : <View />;
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight>
							<Text style={styles.nameText}>{challenges[index].name}</Text>
						</TouchableHighlight>
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

module.exports = GroupChallenges;