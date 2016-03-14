var posts = {
  postComment(comment, groupId, userId){
    comment = comment.toLowerCase().trim();
    var url = "http://localhost:3000/groups/" + groupId + "/comments";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({comment, userId})
    }).then((res) => res.json());
  },

  postChallenge(challengeName, challengeDescription, groupId, userId) {
    var url = "http://localhost:3000/groups/" + groupId + "/challenges";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({challengeName, challengeDescription, userId})
    }).then((response) => response.json());
  },

  postPicture(imagedata, challengeId, participationId) {
    var escape = function(jsonString) {
      return jsonString.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\f/g, "");
    };
    var imagereplaced = escape(imagedata);
    var obj = "data:image/jpeg;base64," + imagereplaced;
    console.log(obj);
    var url = "http://localhost:3000/challenges/" + challengeId + "/participations/" + participationId;
    return fetch(url, {
      method: "post",
      body: JSON.stringify({"obj": obj})
    }).then((res) => res.json());
  },

  optInToChallenge(challengeId, userId) {
    var url = "http://localhost:3000/challenges/" + challengeId + "/participations"
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({userId})
    }).then((response) => response.json());
  }

};

module.exports = posts;
