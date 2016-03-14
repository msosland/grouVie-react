'use strict';
var React = require('react-native');
var GroupPage = require('./GroupPage');
var posts = require('../Utils/posts');

var {
	StyleSheet,
	TouchableHighlight,
	ListView,
	View,
  Image,
	Component,
  Navigator,
  TouchableOpacity,
	Text,
  NativeImagePicker,
  NativeModules: {
    ImagePickerManager
  }
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
  header: {
    height: 200,
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
    borderRadius: 75,
    width: 150,
    height: 150
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class User extends Component {
	constructor(props) {
		super(props);
    console.log(this.props.user);
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
		fetch("http://localhost:3000/users/" + this.props.user.id +"/groups")
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
      posts.postProfilePicture(response.data, id).then((responseJSON) => {
        console.log("********************USER PROPS*****************");
        console.log(this.props.user);
        this.props.user.image_url = responseJSON.image_url;
        this.setState({});
        console.log("****************NEW PROPS****************");
        console.log(this.props.user);
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
      <View style={styles.center}>
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}><View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.props.user.image_url == "/images/original/missing.png" ? <Text>Add a Photo</Text> : <Image style={styles.avatar} source={{uri: this.props.user.image_url}} /> }</View></TouchableOpacity>
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
