import * as actions from "../actions";
import axiosCall from "../../services";
import { call, put } from "redux-saga/effects";
import { CONFIG } from "../../config";

export function* getUpcomingMovies(action) {
  try {
    const response = yield call(
      axiosCall,
      "GET",
      `/movie/upcoming?api_key=${CONFIG.API_KEY}&page=${action.payload.pageNo}`,
      {}
    );
    if (response) {
      yield put(actions.successMoviesList(response.data));
    }
  } catch (error) {
    yield put(actions.errorMoviesList({}));
  }
}

export function* getMovieDetails(action) {
  try {
    const response = yield call(
      axiosCall,
      "GET",
      `/movie/${action.payload.movieId}?api_key=${CONFIG.API_KEY}`
    );
    if (response) {
      yield put(actions.successMovieDetails(response.data));
    }
  } catch (error) {
    yield put(actions.errorMovieDetails({}));
  }
}

export function* requestMovieSearch(action) {
  try {
    const response = yield call(
      axiosCall,
      "GET",
      `/search/movie?api_key=${CONFIG.API_KEY}&query=${action.payload.searchText}&page=${action.payload.pageNo}`,
      ""
    );
    if (response) {
      yield put(actions.successMoviesSearch(response.data));
    }
  } catch (e) {
    yield put(actions.errorMoviesSearch());
  }
}
