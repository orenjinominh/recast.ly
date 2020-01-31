import VideoList from '../components/VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from '../components/VideoPlayer.js';
import Search from '../components/Search.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videosInList: exampleVideoData,
      nowPlaying: exampleVideoData[0]
    };

    this.onListItemClick = this.onListItemClick.bind(this);
    this.fetchData = this.fetchData.bind(this);

  }
  fetchData(dataArray) {
    console.log('fetchedData data--->', dataArray);
    this.setState({
      videosInList: dataArray,
      nowPlaying: dataArray[0]
    });
  }

  componentDidMount() {
    searchYouTube({query: 'screaming goats', max: 5, key: YOUTUBE_API_KEY}, this.fetchData);
  }

  onListItemClick(video) {
    this.setState({
      nowPlaying: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.nowPlaying} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videosInList} onListItemClick={this.onListItemClick} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined

export default App;
