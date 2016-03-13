var posts = {
  postComment(comment, groupId, userId){
    comment = comment.toLowerCase().trim();
    var url = "http://localhost:3000/groups/" + groupId + "/comments";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({comment, userId})
    }).then((res) => res.json());
  }
};

module.exports = posts;
