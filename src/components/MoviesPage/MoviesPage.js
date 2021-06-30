import { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { searchMoviesAPI } from '../../services/apiService';

class MoviesPage extends Component {
  state = {
    searchString: '',
    page: 1,
    movies: [],
    inputValue: '',
    error: null,
  };
  maxPages = 0;

  componentDidUpdate(prevProps, prevState) {
    console.log('MoviesPage DidUpdate');

    if (prevState.searchString !== this.state.searchString || prevState.page !== this.state.page) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${this.state.searchString}`,
      });

      this.movieSearch();
    }
  }

  componentDidMount() {
    console.log('MoviesPage DidMount');
    if (this.props.location.search) {
      const queryParams = queryString.parse(this.props.location.search);
      this.setState(() => {
        return {
          searchString: queryParams.query,
        };
      });
      // this.movieSearch();
    }
  }

  changeHandler = (e) => {
    this.setState(() => ({ inputValue: e.target.value }));
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.state.inputValue.trim() !== '') {
      // this.setState(
      //   () => ({
      //     searchString: this.state.inputValue.trim(),
      //     error: null,
      //   }),
      //   this.movieSearch
      // );
      this.setState(() => ({
        searchString: this.state.inputValue.trim(),
        error: null,
      }));

      // this.props.history.push({
      //   pathname: this.props.location.pathname,
      //   search: `query=${this.state.inputValue.trim()}`,
      // });
    }
  };

  movieSearch = async () => {
    const { searchString, page } = this.state;

    try {
      const response = await searchMoviesAPI(searchString, page);
      // console.log(response, 'response MoviesPage');
      if (response.total_results !== 0) {
        this.maxPages = response.total_pages;

        this.setState(() => ({
          movies: [...response.results],
        }));
      } else {
        // console.log('Not found');
        this.maxPages = 0;
        this.setState(() => ({
          movies: [],
          page: 1,
          error: 'No results were found for your search.',
        }));
      }
    } catch (error) {
      console.error(error);
      this.setState(() => ({
        movies: [],
        page: 1,
        error: error.toString(),
      }));
    }
  };

  render() {
    const { movies, error, inputValue } = this.state;

    return (
      <div className="MoviesContainer">
        <form className="SearchForm" onSubmit={this.submitHandler}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            onChange={this.changeHandler}
            value={inputValue}
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
        {error ? (
          <div>{error}</div>
        ) : (
          <ul className="MoviesList">
            {movies.map((movie) => {
              return (
                <li key={movie.id} className="MoviesListItem">
                  <Link
                    to={`/movies/${movie.id}`}
                    // to={{
                    //   pathname: `/movies/${movie.id}`,
                    //   state: { from: this.props.location },
                    // }}
                    className="Link"
                  >
                    <span className="MoviesListItemTitle">
                      {movie.title}
                      {movie.release_date ? ` (${new Date(movie.release_date).getFullYear()})` : ''}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default MoviesPage;
