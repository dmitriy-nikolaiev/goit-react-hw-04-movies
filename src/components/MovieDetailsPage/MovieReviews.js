import { Component } from 'react';

import { getAddInfoAPI } from '../../services/apiService';

class MovieReviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    // console.log(this.props.history, 'this.props.history MovieReviews');
    // this.props.history.replace(path [, state])
    try {
      const response = await getAddInfoAPI(movieId, 'reviews');
      // if (response.total_results !==0){
      this.setState(() => ({ reviews: response.results }));
      // }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // console.log(this.state, 'state MovieCast');
    return (
      <div className="AddInfoContainer">
        <h4>Reviews:</h4>
        {this.state.reviews.length ? (
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
        ) : (
          <p>We don't have any reviews of this movie.</p>
        )}
      </div>
    );
  }
}
export default MovieReviews;
