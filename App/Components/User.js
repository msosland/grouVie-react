
var React = require('react-native');
var GroupPage = require('./GroupPage');

var {
	StyleSheet,
	TouchableHighlight,
	ListView,
	View,
	Component,
  Navigator,
	Text,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  group_id: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {

		fetch("http://grouvie.herokuapp.com/users/1/groups")
			.then((response) => response.json())
			.then((responseData) => {
        this.setState({
          responseData: responseData,
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	}

  goToGroup() {
    console.log(this.props);
    this.props.navigator.push({
      component: GroupPage,
      title: 'Group',
      passProps: { group: this.props.responseData }
    });
  }

	render() {
		// if (!this.state.loaded) {
		// 	return this.renderLoadingView();
		// }

		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderGroup.bind(this)}
				style={styles.listView} />
			);
	}

	renderGroup(group) {
		return (
			<View style={styles.container}>
        <TouchableHighlight onPress={this.goToGroup.bind(this)}>
  				  <Text>{group.name}</Text>
        </TouchableHighlight>
			</View>
		);
	}
}




module.exports = User;
