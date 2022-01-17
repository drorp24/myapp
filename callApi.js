const axios = require('axios').default;

async function callApi(url) {
  try {
    const response = await axios.get(url);
    return { status: 200, message: response.data.message };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('error.response:', error.response);
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('error.request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}

module.exports = callApi;
