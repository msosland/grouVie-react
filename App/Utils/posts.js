var posts = {
  postComment(comment, groupId){
    comment = comment.toLowerCase().trim();
    var url = "http://localhost:3000/groups/" + groupId + "/comments";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(comment)
    }).then((res) => res.json());
  }
};

module.exports = posts;
