import React from "react";

import "./Preview.scss";

const ArtistPreview = props => {
  return (
    <div className="text-center" style={{ backgroundColor: "#f5f5f5" }}>
      <img
        src={props.profileImg}
        alt={props.artistName}
        onClick={props.showProfile}
        className="previewImg"
      />
      <p className="artist-name">{props.artistName}</p>
    </div>
  );
};

export default ArtistPreview;
