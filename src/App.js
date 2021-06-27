import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './styles.css';
import React, { lazy, Suspense } from 'react';

// import HomePage from './components/HomePage';
// import MoviesPage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';

import logo from './images/blue_square_2.svg';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));

const App = () => (
  <div className="App">
    <header>
      <ul className="NavMenuList">
        <li>
          <NavLink exact to="/" className="NavLink" activeClassName="NavLink--active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="NavLink" activeClassName="NavLink--active">
            Movies
          </NavLink>
        </li>
      </ul>
    </header>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>

    <footer className="Footer">
      <span className="CopyrightText"></span>
      <img className="CopyrightLogo" src={logo} alt="TMDb logo" width="42"></img>
    </footer>
  </div>
);

export default App;
