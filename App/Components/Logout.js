var React = require('react-native');

const {
	Component,
	Text,
	TouchableHighlight,
	View
} = React;

class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	showLogoutButton() {
    return (
      <View>
        <TouchableHighlight>
            <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    )
  }
  
};


const styles = StyleSheet.create({

});


module.exports = Logout;