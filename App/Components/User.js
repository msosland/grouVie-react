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
  TextInput,
	Text,
  NativeImagePicker,
  NativeModules: {
    ImagePickerManager
  }
} = React;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
      groupName: ''
		};
	}

	componentDidMount() {
		this.fetchData();
	}

  fetchData() {

    fetch("http://localhost:3000/users/" + this.props.user.id +"/groups")
      .then((response) => response.json())
      .then((responseData) => {
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
        this.props.user.image_url = responseJSON.image_url;
        this.setState({});
      }).done();
    });
  }

  handleSubmit() {
    console.log("button submitted");
    var groupName = this.state.groupName;
    console.log(groupName);
    console.log(this.props.user.id)
    this.setState({groupName: ''});
    posts.createNewGroup(groupName, this.props.user.id)
    .then((responseJSON) => {
      console.log(responseJSON);
      this.props.groups.push(responseJSON);
      goToGroup(responseJSON);

    })
    .catch((error) => {
      console.log('Request failed', error);
      this.setState({error});
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

  newGroupButton() {
    return (
      <View style={styles.footer}>
      <Text> Create New Group: </Text>
        <View>

          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} autoCapitalize='none' placeholder='Group Name' autoCorrect={false} onChangeText={(groupName) => this.setState({groupName})} value={this.state.groupName}/>
          <TouchableHighlight style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88d4f5">
            <Text>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
      );
  }

	render() {
		return (
      <View>
			<ListView
        renderHeader={this.getUserName.bind(this)}
				dataSource={this.state.dataSource}
				renderRow={this.renderGroup.bind(this)}
        renderFooter={this.newGroupButton.bind(this)}
				style={styles.listView} />
        </View>
			);
	}

  renderGroup(group) {
    return (
        <View style={styles.container}>
          <TouchableHighlight  onPress={() => this.goToGroup(group)}>
              <Text style={styles.groupList}>{group.name}</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  user: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  groupList: {
    fontSize: 35,
    color: 'white',
    margin: 10,
    padding: 30,
    width: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
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
    backgroundColor: '#310373',
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
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = User;
