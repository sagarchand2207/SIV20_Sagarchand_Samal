import React from "react";
import { CONFIG } from "../config";

export default function MovieCard({ props }) {
  const { data, onCardClick } = props;
  return (
    <div className="movie-card" onClick={onCardClick}>
      <img src={CONFIG.IMAGE_BASE_URL + data.poster_path} alt={data.title} />
      <div className="title-rating">
        <span> {data.title}</span>
        <span>{data.vote_average}</span>
      </div>
      <div className="movie-info">
        <span>{data.overview}</span>
      </div>
    </div>
  );
}
