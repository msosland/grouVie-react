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
  DeviceEventEmitter,
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
      btnLocation: 0,
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

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    this.setState({btnLocation: e.endCoordinates.height})
  }

  keyboardWillHide (e) {
    this.setState({btnLocation: 0})
  }

  fetchData() {
    fetch("http://grouvie.herokuapp.com/users/" + this.props.user.id +"/groups")
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
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var id = this.props.user.id;
        posts.postProfilePicture(response.data, id).then((responseJSON) => {
          this.props.user.image_url = responseJSON.image_url;
          this.setState({});
        }).done();
    }
    });
  }

  handleChange(e) {
    this.setState({
      groupName: e.nativeEvent.text
    })
  }

  handleSubmit() {
    var groupName = this.state.groupName;
    this.setState({groupName: ''});
    posts.createNewGroup(groupName, this.props.user.id)
    .then((responseJSON) => {
      this.fetchData();
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
          <Text style={styles.profileUsername}>{this.props.user.username}</Text></View>
      );
    }

  newGroupForm() {
    return (
      <View>
          <TextInput style={styles.textInput} autoCapitalize='none' placeholder='Group Name' autoCorrect={false} onChange={this.handleChange.bind(this)} value={this.state.groupName}/>
          <TouchableHighlight
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#6d00ff">
            <Text style={styles.createNew}>Create New Group</Text>
          </TouchableHighlight>
      </View>
      );
  }

  renderGroup(group) {
    return (
        <View style={styles.groupContainer}>
          <TouchableHighlight  onPress={() => this.goToGroup(group)}
          underlayColor="#6d00ff">
              <Text style={styles.groupList}>{group.name}</Text>
          </TouchableHighlight>
        </View>
    );
  }

	render() {
		return (
      <View style={{flex: 1}}>
			<ListView
        renderHeader={this.getUserName.bind(this)}
				dataSource={this.state.dataSource}
				renderRow={this.renderGroup.bind(this)}
				style={styles.listView} />
        <View style={{bottom: this.state.btnLocation}}>{this.newGroupForm()}</View>
        </View>
			);
	}
}

var styles = StyleSheet.create({
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  avatarContainer: {
    borderColor: '#310373',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#310373',
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  createNew: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    padding: 5,
    backgroundColor: '#4800a8'
  },
  groupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: '#310373',
    borderBottomColor: '#310373',
    borderBottomWidth: 1,
  },
  groupList: {
    fontSize: 35,
    color: '#310373',
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  listView: {
    paddingTop: 60,
    backgroundColor: 'white',
  },
  profileUsername: {
    color: '#310373',
    fontSize: 18,
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#310373',
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  white: {
    color: 'white'
  }
});

module.exports = User;
