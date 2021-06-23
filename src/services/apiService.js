const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e889453aa30d6b4f21fdceb87712859b';

const fetchData = async (queryString) => {
  const rawResult = await fetch(queryString);

  if (!rawResult.ok) {
    throw rawResult;
  }

  const result = await rawResult.json();

  return result;
};

export const getTrendingAPI = async () => {
  const queryString = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;

  const result = await fetchData(queryString);

  return result;
};

// export const getMovieDetailsAPI = async (movieId, addInfo = '') => {
//   const queryString = `${BASE_URL}movie/${movieId}${!addInfo || '/' + addInfo}?api_key=${API_KEY}`;
export const getMovieDetailsAPI = async (movieId, addInfo = '', page = 0) => {
  const queryString = `${BASE_URL}movie/${movieId}${!addInfo || '/' + addInfo}?api_key=${API_KEY}${
    page === 0 ? '' : page
  }`;
  console.log(queryString, 'queryString getMovieDetailsAPI');
  const result = await fetchData(queryString);

  return result;
};

export const getCastAPI = async (movieId) => {};

export const searchMoviesAPI = async (searchString, page = 1) => {
  const queryString = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchString}&page=${page}&include_adult=false`;

  const result = await fetchData(queryString);

  return result;
};

// import axios from 'axios';

// const fetchArticlesWithQuery = searchQuery => {
//   return axios
//     .get(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
//     .then(response => response.data.hits);
// };

// export default {
//   fetchArticlesWithQuery,
// };

// export default fetchImages;
