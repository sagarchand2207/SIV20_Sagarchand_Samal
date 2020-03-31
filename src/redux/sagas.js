import {takeLatest, all} from 'redux-saga/effects';
import constants from './constants';
import { getUpcomingMovies, getMovieDetails, requestMovieSearch } from './movies/action';

function* watchActions(){
    yield takeLatest(constants.REQUEST_MOVIES_LIST, getUpcomingMovies)
    yield takeLatest(constants.REQUEST_MOVIE_DETAILS, getMovieDetails)
    yield takeLatest(constants.REQUEST_MOVIES_SEARCH, requestMovieSearch)
}

export default function* rootSaga(){
    yield all([watchActions()])
}