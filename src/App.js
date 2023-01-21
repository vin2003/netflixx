import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row title='Netflixx Originals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title='Trending Now' fetchUrl={requests.fetchTrendingURL} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
    </div>
  );
}

export default App;
