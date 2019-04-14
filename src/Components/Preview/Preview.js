import React from "react";

import "./Preview.scss";

const ArtistPreview = props => {
  return (
    <div className="text-center">
      <img
        src={props.profileImg}
        alt={props.artistName}
        onClick={props.showProfile}
      />
      <p>{props.artistName}</p>
    </div>
  );
};

export default ArtistPreview;
