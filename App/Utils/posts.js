var posts = {
  postComment(comment, groupId, userId){
    comment = comment.toLowerCase().trim();
    var url = "http://grouvie.herokuapp.com/groups/" + groupId + "/comments";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({comment, userId})
    }).then((res) => res.json());
  },

  postChallenge(challengeName, challengeDescription, groupId, userId) {
    var url = "http://grouvie.herokuapp.com/groups/" + groupId + "/challenges";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({challengeName, challengeDescription, userId})
    }).then((response) => response.json());
  },

  postPicture(imagedata, challengeId, participationId) {
    var escape = function(jsonString) {
      return jsonString.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");
    }
    var imagereplaced = escape(imagedata);
    var imagereplacedagain = imagereplaced.replace(/=/g, "");
    var obj = "data:image/jpeg;base64," + imagereplacedagain;
    console.log(obj);
    var url = "http://grouvie.herokuapp.com/challenges/" + challengeId + "/participations/" + participationId;
    return fetch(url, {
      method: "post",
      body: JSON.stringify({"obj": obj})
    }).then((res) => res.json());
  },

  postProfilePicture(imagedata, userId) {
    var escape = function(jsonString) {
      return jsonString.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "").replace(/=/g, "");
    };
    var imagereplaced = escape(imagedata);
    var imagereplacedagain = imagereplaced.replace(/=/g, "");
    var obj = "data:image/jpeg;base64," + imagereplacedagain;

    console.log(obj);
    var url = "http://grouvie.herokuapp.com/users/" + userId;
    return fetch(url, {
      method: "post",
      body: JSON.stringify({"obj": obj})
    }).then((res) => res.json());
  },

  optInToChallenge(challengeId, userId) {
    var url = "http://grouvie.herokuapp.com/challenges/" + challengeId + "/participations"
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({userId})
    }).then((response) => response.json());
  },

  createNewGroup(groupName, userId) {
    var url = "http://grouvie.herokuapp.com/users/" + userId + "/groups"
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({groupName})
    }).then((response) => response.json());
  },

  addMemberToGroup(username, groupId) {
    var url = "http://localhost:3000/memberships/"
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({username, groupId})
    }).then((response) => response.json());
  },

};

module.exports = posts;
