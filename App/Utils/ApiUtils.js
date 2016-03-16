var React = require('react-native');
var {Alert} = React;

var ApiUtils = {
  checkStatus: function(response) {
    if (response.status == 200) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      alert("Please enter correct credentials", null);
    }
  }
};

module.exports = ApiUtils;
