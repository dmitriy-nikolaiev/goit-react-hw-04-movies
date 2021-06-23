import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './styles.css';

import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';

import logo from './images/blue_square_2.svg';

const App = () => (
  <div className="App">
    <ul className="NavMenu">
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

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route exact path="/movies" component={MoviesPage} />
      <Route path="/movies/:movieId" component={MovieDetailsPage} />
      {/* <Route path="/contact" component={Contact} /> */}
      <Redirect to="/" />
    </Switch>

    <footer className="Footer">
      <span className="CopyrightText">Source:</span>
      <img className="CopyrightLogo" src={logo} alt="TMDb logo" width="42"></img>
    </footer>
  </div>
);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         {/* <HomePage trending={this.state.trending} /> */}
//         <Switch>
//           <Route path="/" exact component={HomePage} />
//           <Route path="/movieDetails" component={MovieDetailsPage} />
//           {/* <Route path="/contact" component={Contact} /> */}
//           <Redirect to="/" />
//         </Switch>
//       </div>
//     );
//   }
// }

export default App;
