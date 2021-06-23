import { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import { getMovieDetailsAPI } from '../../services/apiService';

import MovieCast from './MovieCast';
import MovieReviews from './MovieReviews';

class MovieDetailsPage extends Component {
  state = {
    id: null,
    poster_path: null,
    title: null,
    genres: [],
    release_date: null,
    overview: null,
    vote_average: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const response = await getMovieDetailsAPI(movieId);
      // console.log(response, 'response getMovieDetails');
      this.setState({ ...response });
    } catch (error) {
      console.error(error);
    }

    // this.setState({ ...response.data });
  }

  render() {
    // console.log('render MovieDetails');
    const { id, poster_path, title, genres, release_date, overview, vote_average } = this.state;
    return (
      <div className="MovieDetailsContainer">
        <img
          src={poster_path ? 'https://image.tmdb.org/t/p/w92' + poster_path : ''}
          alt={title + ' poster'}
        ></img>
        <div>
          <h2 className="MovieTitle">{`${title} (${new Date(release_date).getFullYear()})`}</h2>
          <p>Vote average: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(' ')}</p>
        </div>
        <div className="AddInfoMenu">
          <p>Additional information</p>
          <ul>
            <li>
              {/* <Link to={`/movies/${id}/cast`} className="Link" activeClassName="Link--active"> */}
              <Link to={`/movies/${id}/cast`} className="Link">
                Cast
              </Link>
            </li>
            <li>
              <Link to={`/movies/${id}/reviews`} className="Link">
                Reviews
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/movies/:movieId/cast" component={MovieCast} />
            <Route exact path="/movies/:movieId/reviews" component={MovieReviews} />
            {/* <Route path="/contact" component={Contact} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
