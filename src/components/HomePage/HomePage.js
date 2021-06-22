import { Component } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

import { getTrending } from '../../services/apiService';

class HomePage extends Component {
  state = {
    trending: [],
    page: 1,
  };

  maxPages = 0;

  componentDidMount(prevProps, prevState) {
    this.getTrendingHandler();
  }

  getTrendingHandler = async () => {
    const { trending, page } = this.state;
    // this.setState({ isLoading: true, error: '' });
    try {
      const result = await getTrending(page);
      console.log(result, 'result trending');
      if (result.total_results !== 0) {
        this.maxPages = result.total_pages;

        this.setState(() => ({
          trending: [...trending, ...result.results],
        }));
      } else {
        // console.log('Not found');
        this.maxPages = 0;
        this.setState(() => ({
          trending: [],
          page: 1,
          // error: 'No results were found for your search.',
        }));
      }
    } catch (error) {
      console.error(error);
      // this.setState(() => ({ error: error.toString() }));
      // } finally {
      //   this.setState({ isLoading: false });

      //   // this.scrollToHandler();
    }
  };

  render() {
    return (
      <div className="HomePageContainer">
        <h2 className="HomePageTitle">Trending today</h2>
        <ul className="TrendingList">
          {this.state.trending.map((item) => {
            return (
              <li key={item.id} className="TrendingListItem">
                <span className="TrendingItemTitle">{item.title}</span>
              </li>
              // <li key={item.id} className="TrendingListItem">
              //   <p className="TrendingItemTitle">{item.title}</p>
              //   <span className="TrendingItemVote">{item.vote_average}</span>
              //   <img
              //     className="TrendingItemPoster"
              //     src={'https://image.tmdb.org/t/p/w92' + item.poster_path}
              //     alt=""
              //   ></img>
              // </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default HomePage;
