import { Component } from 'react';

class MovieDetailsPage extends Component {
  render() {
    return (
      <div className="MovieDetailsContainer">
        <h2>Detail</h2>
        <span>{this.props.id}</span>
      </div>
    );
  }
}

export default MovieDetailsPage;
