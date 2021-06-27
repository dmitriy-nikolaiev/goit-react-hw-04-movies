import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './styles.scss';
import React, { lazy, Suspense } from 'react';

// import HomePage from './components/HomePage';
// import MoviesPage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';

import logo from './images/blue_long_2.svg';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));

const App = () => (
  <div className="App">
    <header className="Header">
      <ul className="NavMenuList">
        <li className="NavMenuItem">
          <NavLink exact to="/" className="NavLink" activeClassName="NavLink--active">
            Home
          </NavLink>
        </li>
        <li className="NavMenuItem">
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
      <span className="CopyrightText">source:</span>
      <img className="CopyrightLogo" src={logo} alt="TMDb logo"></img>
    </footer>
  </div>
);

export default App;
