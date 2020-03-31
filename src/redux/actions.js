import constants from "./constants";

//Get Upcoming Movies
export function requestMoviesList(payload) {
  return {
    type: constants.REQUEST_MOVIES_LIST,
    payload
  };
}

export function successMoviesList(payload) {
  return {
    type: constants.SUCCESS_MOVIES_LIST,
    payload
  };
}

export function errorMoviesList(payload) {
  return {
    type: constants.ERROR_MOVIES_LIST,
    payload
  };
}

//Search Movies
export function requestMoviesSearch(payload) {
  return {
    type: constants.REQUEST_MOVIES_SEARCH,
    payload
  };
}

export function successMoviesSearch(payload) {
  return {
    type: constants.SUCCESS_MOVIES_SEARCH,
    payload
  };
}

export function errorMoviesSearch(payload) {
  return {
    type: constants.ERROR_MOVIES_SEARCH,
    payload
  };
}

//Get Movie Details

export function requestMovieDetails(payload) {
  return {
    type: constants.REQUEST_MOVIE_DETAILS,
    payload
  };
}

export function successMovieDetails(payload) {
  return {
    type: constants.SUCCESS_MOVIE_DETAILS,
    payload
  };
}

export function errorMovieDetails(payload) {
  return {
    type: constants.ERROR_MOVIE_DETAILS,
    payload
  };
}

//Clear Search

export function clearSearch() {
  return {
    type: constants.CLEAR_MOVIES_SEARCH
  };
}
