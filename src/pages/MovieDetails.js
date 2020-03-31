import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestMovieDetails } from "../redux/actions";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { CONFIG } from "../config";
import { getYear } from "../utils";

export default function MovieDetails(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestMovieDetails({ movieId: props.match.params.id }));
  }, []);
  const movieDetails = useSelector(state => state.movies.movieDetails);
  const { data } = movieDetails;
  return (
    <div>
      <Header props={{ ...props, search: false }} />
      {movieDetails.isSuccess && (
        <div className="movie-details-container">
          <div className="image-container">
            <img src={CONFIG.IMAGE_BASE_URL + data.poster_path} />
          </div>
          <div className="movie-details">
            <div className="title">
              {data.title} <span className="rating">({data.vote_average})</span>
            </div>
            <div className="info">
              {getYear(data.release_date)} | {data.runtime} | Director
            </div>
            <div className="info">Cast: Actor 1, Actor 2, ...</div>
            <div className="info">Description: {data.overview}</div>
          </div>
        </div>
      )}
    </div>
  );
}
