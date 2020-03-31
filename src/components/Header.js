import React from "react";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { ReactComponent as HomeIcon } from "../assets/homeIcon.svg";

export default function Header({ props }) {
  return (
    <div className="header">
      {props.search ? (
        <div className="search-input-wrapper">
          <SearchIcon height="24px" width="24px" />
          <input
            placeholder="Search"
            value={props.searchText}
            onChange={e => {
              props.handleSearch(e.target.value);
            }}
            className="search-bar"
          />
          {props.searchText && <span className="cross-icon" onClick={()=>props.cancelSearch()}>X</span>}
        </div>
      ) : (
        <div className="header-title">Movie Details</div>
      )}
      <HomeIcon
        className="home-btn"
        height="24px"
        width="24px"
        onClick={() => {
          props.history.push("/");
        }}
      />
    </div>
  );
}
