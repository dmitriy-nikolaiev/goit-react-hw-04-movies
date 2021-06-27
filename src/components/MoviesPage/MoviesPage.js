import { Component } from 'react';
import { Link } from 'react-router-dom';

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
  // error = '';
  // componentDidUpdate(prevState) {
  //   if (prevState.searchString !== this.state.searchString || prevState.page !== this.state.page) {
  //     console.log(prevState.searchString, 'prevState.searchString');
  //     console.log(this.state.searchString, 'this.state.searchString');
  //     // this.movieSearch();
  //   }
  // }

  changeHandler = (e) => {
    this.setState(() => ({ inputValue: e.target.value }));
  };

  submitHandler = (e) => {
    e.preventDefault();

    // console.log(this.state.inputValue, 'inputValue');

    if (this.state.inputValue.trim() !== '') {
      this.setState(
        () => ({
          searchString: this.state.inputValue.trim(),
          error: null,
        }),
        this.movieSearch
      );
    }
  };

  movieSearch = async () => {
    const { searchString, page } = this.state;
    // if (searchString === '') {
    //   console.log('searchString Empty');
    //   return;
    // }
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
                  <Link to={`/movies/${movie.id}`} className="Link">
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
