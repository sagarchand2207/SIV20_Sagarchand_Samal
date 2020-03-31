import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  requestMoviesList,
  requestMoviesSearch,
  clearSearch
} from "../redux/actions";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ListLoader from "../components/ListLoader";
import debounce from "lodash.debounce";

export default function MoviesList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestMoviesList({ pageNo: "1" }));
  }, []);
  const moviesList = useSelector(state => state.movies.moviesList);
  const [searchText, setSearchText] = useState("");
  const [isSearch, setSearch] = useState(false);
  const handleSearch = async val => {
    setSearch(true);
    setSearchText(val);
    debounce(() => searchMovies(val), 200)();
  };
  const searchMovies = val => {
    if (val) {
      dispatch(requestMoviesSearch({ searchText: val, pageNo: 1 }));
    }
  };
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (isSearch) {
        if (
          moviesList.searchedMovies.pageNo !=
            moviesList.searchedMovies.totalPage &&
          !moviesList.pageLoading
        ) {
          dispatch(
            requestMoviesSearch({
              pageNo: moviesList.searchedMovies.pageNo + 1,
              morePages: true,
              searchText: searchText
            })
          );
        }
      } else {
        if (
          moviesList.upcomingMovies.pageNo !=
            moviesList.upcomingMovies.totalPage &&
          !moviesList.pageLoading
        ) {
          dispatch(
            requestMoviesList({
              pageNo: moviesList.upcomingMovies.pageNo + 1,
              morePages: true
            })
          );
        }
      }
    }
  };
  const cancelSearch = () => {
    setSearch(false);
    setSearchText("");
    dispatch(clearSearch());
  };
  const movies = isSearch
    ? moviesList.searchedMovies
    : moviesList.upcomingMovies;
  return (
    <div>
      <Header
        props={{
          ...props,
          search: true,
          handleSearch,
          searchText,
          cancelSearch
        }}
      />
      <div
        className={
          moviesList.isSuccess ? "movie-list-container" : "loader-container"
        }
      >
        {moviesList.isLoading || moviesList.isSearchingLoading ? (
          <Loader />
        ) : (moviesList.isError &&
            moviesList.upcomingMovies.data.length === 0) ||
          (moviesList.isSearchingError &&
            moviesList.searchedMovies.data.length === 0) ? (
          <h2>Error Occurs</h2>
        ) : moviesList.isSuccess || moviesList.isSearchingSuccess ? (
          movies.data?.map((dat, i) => {
            return (
              <MovieCard
                key={i}
                props={{
                  data: dat,
                  onCardClick: () => {
                    props.history.push(`/movie_details/${dat.id}`);
                  }
                }}
              />
            );
          })
        ) : null}
      </div>
      <div className="page-loder-container">
        {movies.pageNo && movies.pageNo === movies.totalPage ? (
          <h6>End Of The Page</h6>
        ) : moviesList.pageLoading ? (
          <ListLoader />
        ) : movies.data.length &&
          (moviesList.isError || moviesList.isSearchingError) ? (
          <h6>Error Occured While Loading More Pages</h6>
        ) : null}
      </div>
    </div>
  );
}
