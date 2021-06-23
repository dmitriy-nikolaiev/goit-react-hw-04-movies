import { Component } from 'react';

import { getAddInfoAPI } from '../../services/apiService';

class MovieCast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const response = await getAddInfoAPI(movieId, 'credits');
      // console.log(response, 'response MovieCast');
      this.setState(() => ({ ...response }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // console.log(this.state, 'state MovieCast');
    return (
      <div className="AddInfoContainer">
        <h4>Cast:</h4>
        <ul className="CastList">
          {this.state.cast.map((profile) => {
            const { cast_id, profile_path, name, character } = profile;
            return (
              <li key={cast_id} className="CastListItem">
                <img
                  className="CastItemImage"
                  src={profile_path ? 'https://image.tmdb.org/t/p/w92' + profile_path : ''}
                  alt={profile_path ? name : 'No photo'}
                ></img>
                <div className="CastItemInfo">
                  <p className="CastItemTitle">{name}</p>
                  <p className="CastItemCharacter">{character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default MovieCast;
