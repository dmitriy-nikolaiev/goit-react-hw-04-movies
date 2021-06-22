import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles.css';

import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <HomePage trending={this.state.trending} /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={MovieDetailsPage} />
          {/* <Route path="/contact" component={Contact} /> */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
