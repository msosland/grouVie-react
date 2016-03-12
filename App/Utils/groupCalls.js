var groupCalls = {
  getComments(group) {
    var id = group.id;
    var url = "http://grouvie/herokuapp.com/groups/" + id + "/comments";
    return fetch(url).then(res)
  },

  getMembers(group) {
    var id = group.id;
    var url = "http://grouvie/herokuapp.com/groups/" + id + "/members";
    return fetch(url).then(res)
  },

  getChallenges(group) {
    var id = group.id;
    var url = "http://grouvie/herokuapp.com/groups/" + id + "/challenges";
    return fetch(url).then(res)
  }
};

module.exports = groupCalls;