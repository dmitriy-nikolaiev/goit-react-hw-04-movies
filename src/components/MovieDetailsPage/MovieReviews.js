import { Component } from 'react';

import { getAddInfoAPI } from '../../services/apiService';

class MovieReviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      const response = await getAddInfoAPI(movieId, 'reviews');
      // console.log(response, 'response MovieReviews');
      this.setState(() => ({ reviews: response.results }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // console.log(this.state, 'state MovieCast');
    return (
      <div className="AddInfoContainer">
        <h4>Reviews:</h4>
        <ul className="ReviewsList">
          {this.state.reviews.map((review) => {
            const { id, author, content } = review;
            return (
              <li key={id} className="ReviewsListItem">
                <div className="CastItemInfo">
                  <p className="ReviewsItemAuthor">{author}</p>
                  <p className="ReviewsItemText">{content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default MovieReviews;
