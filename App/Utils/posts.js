var posts = {
  postComment(comment, groupId){
    comment = comment.toLowerCase().trim();
    // console.log(JSON.stringify({content: comment});
    var url = "http://localhost:3000/groups/" + groupId + "/comments";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(comment)
    }).then((res) => console.log(res));
  }
};

module.exports = posts;
