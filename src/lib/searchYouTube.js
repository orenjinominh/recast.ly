import YOUTUBE_API_KEY from "../config/youtube.js";

/*
* Use jQuery to send a GET request to the search endpoint. This is the only time you should use jQuery in this sprint
* Accept a callback function that is invoked with the videos array that is returned from hitting the endpoint
* Accept an options object with the following properties:
query - the string to search for
max - the maximum number of videos to get, which should default to 5
key - an authorized YouTube Browser API key
* Only GET embeddable videos

*/
var options = {
  query: '', //TBD, value of search input box
  max: 5,
  key: YOUTUBE_API_KEY,
};
//searchYouTube(options, ??)
var searchYouTube = (options, callback) => {

  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: options.key,
      q: options.query,
      part: 'snippet',
      maxResults: options.max,
      type: 'video',
      videoEmbeddable: true,
    },
    contentType: 'application/json',
    success: function(data) {
      console.log('data--->', data);
      callback(data.items);
    },
    error: function(response) {
      console.log('Request Failed');
    }
  });

};

export default searchYouTube;
