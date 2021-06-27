import { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

import { getMovieDetailsAPI } from '../../services/apiService';

// import MovieCast from './MovieCast';
// import MovieReviews from './MovieReviews';
const MovieCast = lazy(() => import('./MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));

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
      this.setState({ ...response });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // console.log(this.props, 'props MovieDetails');
    const { id, poster_path, title, genres, release_date, overview, vote_average } = this.state;
    return (
      <div className="MovieDetailsContainer">
        <button type="button" onClick={this.props.history.goBack} className="ButtonGoBack">
          ← Go back
        </button>
        <div className="MovieDetails">
          <img
            src={poster_path ? 'https://image.tmdb.org/t/p/w185' + poster_path : ''}
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
        </div>
        <div className="AddInfoMenu">
          <p>Additional information</p>
          <ul>
            <li>
              <Link to={`/movies/${id}/cast`} replace className="Link">
                {/* <Link to={`/movies/${id}/cast`} className="Link"> */}
                Cast
              </Link>
            </li>
            <li>
              <Link to={`/movies/${id}/reviews`} replace className="Link">
                {/* <Link to={`/movies/${id}/reviews`} className="Link"> */}
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/movies/:movieId/cast" component={MovieCast} />
              <Route exact path="/movies/:movieId/reviews" component={MovieReviews} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
