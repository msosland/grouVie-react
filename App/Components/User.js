var React = require('react-native');
var GroupPage = require('./GroupPage');
var posts = require('../Utils/posts');

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
    top: 40,
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
    paddingTop: 60,
    backgroundColor: 'orange',
  },
  avatar: {
    borderRadius: 0,
    width: 150,
    height: 150
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
      groups: [],
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
    console.log(this.props);
		fetch("http://grouvie.herokuapp.com/users/" + this.props.user.id +"/groups")
			.then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	}

  selectPhotoTapped(item) {
    const options = {
      title: 'Photo Picker',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePickerManager.showImagePicker(options, (response) => {
      var id = this.props.user.id;
      var user = this.props.challenge.participations.find(function(participant) {
        return participant.user_id === id;
      })
      var index = this.props.challenge.participations.indexOf(user);
      if (index > -1) {
        this.props.challenge.participations.splice(index, 1);
      }
      posts.postPicture(response.data, this.props.challenge.id, user.id ).then((responseJSON) => {
        this.props.challenge.participations.splice(index, 0, responseJSON);
        this.setState({});
      }).done();
    });
  }

  goToGroup(group) {
    this.props.navigator.push({
      component: GroupPage,
      passProps: {group: group, user: this.props.user}
    });
  }

  getUserName() {
    return (
      <View>
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.props.user.image_url == "/images/original/missing.png" ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={{uri: this.props.user.image_url}} />
          }
          </View>
        </TouchableOpacity>
      <Text>{this.props.user.username}</Text></View>
      );
  }

	render() {

		return (
			<ListView
        renderHeader={this.getUserName.bind(this)}
				dataSource={this.state.dataSource}
				renderRow={this.renderGroup.bind(this)}
				style={styles.listView} />
			);
	}

	renderGroup(group) {
		return (
  			<View style={styles.container}>
          <TouchableHighlight onPress={() => this.goToGroup(group)}>
    				  <Text>{group.name}</Text>
          </TouchableHighlight>
  			</View>
		);
	}
}


module.exports = User;
