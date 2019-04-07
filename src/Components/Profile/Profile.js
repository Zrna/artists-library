import React from "react";

import Related from "../Related/Related";

const Profile = props => {
  return (
    <div>
      <img src={props.profileImg} alt={props.artistName} />
      <p>{props.artistName}</p>
      <p>Fans: {props.numFans}</p>
      <p>Number of Albums: {props.numAlbums}</p>
      <p>Albums names: {props.albumTitle}</p>
      <Related artistId={props.artistId} />
    </div>
  );
};

export default Profile;