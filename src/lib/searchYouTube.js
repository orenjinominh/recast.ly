import YOUTUBE_API_KEY from '../config/youtube.js';

var options = {
  query: '', //TBD, value of search input box
  max: 5,
  key: YOUTUBE_API_KEY,
};

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
