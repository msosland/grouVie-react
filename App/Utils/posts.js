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

  optInToChallenge(challengeId, userId) {
    var url = "http://grouvie.herokuapp.com/challenges/" + challengeId + "/participations"
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({userId})
    }).then((response) => response.json());
  },
};

module.exports = posts;
