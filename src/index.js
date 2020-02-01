import searchYouTube from './lib/searchYouTube.js';
import App from './components/App.js';

ReactDOM.render(<App searchYouTube={searchYouTube} />, document.getElementById('app'));

