import VideoList from '../components/VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from '../components/VideoPlayer.js';
import Search from '../components/Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videosInList: exampleVideoData,
      nowPlaying: exampleVideoData[0]
    };

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    // this.onButtonClick = this.onButtonClick.bind(this);
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
    this.props.searchYouTube({query: 'screaming goats', max: 5, key: YOUTUBE_API_KEY}, this.fetchData);
  }

  onListItemClick(video) {
    this.setState({
      nowPlaying: video
    });
  }

  onInputChange(e) { 
    var searchedText = this.props.searchYouTube({query: e.target.value, max: 5, key: YOUTUBE_API_KEY}, this.fetchData); // fetchData is updating videoList and nowPlaying automatically
    _.debounce(searchedText, 500, {leading: false, trailing: true});  
  }

  // onButtonClick(event) {
  //   // prevent default and clear input box 
  //   event.preventDefault();
  //   document.getElementById('inputBox').reset();
  //   this.onInputChange(document.getElementById('inputBox').value);
  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onInputChange={this.onInputChange}  /> 
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

export default App;
