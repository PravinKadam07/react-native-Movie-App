import axios from "axios";
import { apiKey } from "../constants/index.js";

//endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

export const posterFallBackImage =
  "https://cinesura.com/storage/poster-unavailable.png?1712494834";

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
