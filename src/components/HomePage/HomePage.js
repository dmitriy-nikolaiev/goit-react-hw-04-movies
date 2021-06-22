import { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePageContainer">
        <h2 className="HomePageTitle">Trending today</h2>
        <ul className="TrendingList">
          {this.props.trending.map((item) => {
            return (
              <li key={item.id} className="TrendingListItem">
                <p className="TrendingItemTitle">{item.title}</p>
                <span className="TrendingItemVote">{item.vote_average}</span>
                <img
                  className="TrendingItemPoster"
                  src={'https://image.tmdb.org/t/p/w92' + item.poster_path}
                  alt=""
                ></img>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default HomePage;
