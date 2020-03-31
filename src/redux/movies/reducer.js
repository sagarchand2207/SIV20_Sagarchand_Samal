import constants from "../constants";

const initialState = {
  moviesList: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isSearchingLoading: false,
    isSearchingError: false,
    isSearchingSuccess: false,
    pageLoading: false,
    upcomingMovies: {
      data: []
    },
    searchedMovies: {
      data: []
    }
  },
  movieDetails: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {}
  }
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case constants.REQUEST_MOVIES_LIST:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isLoading:
            state.moviesList.upcomingMovies.data.length > 0 ? false : true,
          isSuccess:
            state.moviesList.upcomingMovies.data.length > 0 ? true : false,
          isError: false,
          upcomingMovies:
            state.moviesList.upcomingMovies.data.length > 0
              ? state.moviesList.upcomingMovies
              : { data: [] },
          pageLoading: action.payload.morePages
            ? action.payload.morePages
            : false,
          searchedMovies: {
            data: []
          }
        }
      };
    case constants.SUCCESS_MOVIES_LIST:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isLoading: false,
          isSuccess: true,
          isError: false,
          upcomingMovies: {
            data: [
              ...state.moviesList.upcomingMovies.data,
              ...action.payload.results?.sort((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date);
              })
            ],
            pageNo: action.payload.page,
            totalPage: action.payload.total_pages
          },
          pageLoading: false,
          searchedMovies: {
            data: []
          }
        }
      };
    case constants.ERROR_MOVIES_LIST:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isLoading: false,
          isSuccess:
            state.moviesList.upcomingMovies.data.length > 0 ? true : false,
          isError: true,
          upcomingMovies: state.moviesList.upcomingMovies.data
            ? state.moviesList.upcomingMovies
            : { data: [] },
          pageLoading: false,
          searchedMovies: {
            data: []
          }
        }
      };
    case constants.REQUEST_MOVIES_SEARCH:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isSearchingLoading:
            action.payload.pageNo === 1
              ? true
              : state.moviesList.searchedMovies.data.length > 0
              ? false
              : true,
          isSearchingSuccess:
            action.payload.pageNo === 1
              ? false
              : state.moviesList.searchedMovies.data.length > 0
              ? true
              : false,
          isSearchingError: false,
          pageLoading: action.payload.morePages
            ? action.payload.morePages
            : false,
          searchedMovies:
            action.payload.pageNo === 1
              ? { data: [] }
              : state.moviesList.searchedMovies.data.length > 0
              ? state.moviesList.searchedMovies
              : { data: [] }
        }
      };
    case constants.SUCCESS_MOVIES_SEARCH:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isSearchingLoading: false,
          isSearchingSuccess: true,
          isSearchingError: false,
          pageLoading: false,
          searchedMovies:
            action.payload.page === 1
              ? {
                  data: [...action.payload.results],
                  pageNo: action.payload.page,
                  totalPage: action.payload.total_pages
                }
              : {
                  data: [
                    ...state.moviesList.searchedMovies.data,
                    ...action.payload.results
                  ],
                  pageNo: action.payload.page,
                  totalPage: action.payload.total_pages
                }
        }
      };
    case constants.ERROR_MOVIES_SEARCH:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isSearchingLoading: false,
          isSearchingSuccess:
            state.moviesList.searchedMovies.data.length > 0 ? true : false,

          isSearchingError: true,
          pageLoading: false,
          searchedMovies: state.moviesList.searchedMovies.data
            ? state.moviesList.searchedMovies
            : { data: [] }
        }
      };
    case constants.REQUEST_MOVIE_DETAILS:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          isLoading: false,
          isError: false,
          isSuccess: false,
          isSearchingLoading: false,
          isSearchingError: false,
          isSearchingSuccess: false,
          pageLoading: false,
          upcomingMovies: {
            data: []
          },
          searchedMovies: {
            data: []
          }
        },
        movieDetails: {
          ...state.movieDetails,
          isLoading: true,
          isSuccess: false,
          isError: false,
          data: {}
        }
      };
    case constants.SUCCESS_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          isLoading: false,
          isSuccess: true,
          isError: false,
          data: action.payload
        }
      };
    default:
      return {
        ...state
      };
  }
};
export default movies;
