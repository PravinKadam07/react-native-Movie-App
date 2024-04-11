import axios from "axios";
import { apiKey } from "../constants/index.js";

//endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMovies = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
//dynamic endpoints
const movieDetails = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCredits = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

const similarMovieDetails = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetails = (id) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

const personMovies = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const posterFallBackImage =
  "https://img.jagrantv.com/web-stories/no-image.jpg";

export const personFallBackImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxO2jo9HIP5lGk8fElgwnep1VHH289efwq1cnrCGmCw&s";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    params: params ? params : {},
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetails(id));
};
export const fetchMovieCredit = (id) => {
  return apiCall(movieCredits(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMovieDetails(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetails(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMovies(id));
};

export const searchMovie = (params) => {
  return apiCall(searchMovies, params);
};
