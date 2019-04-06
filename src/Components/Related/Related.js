import React from "react";

const Related = props => {
  const url = `/artist/${props.artistId}/related`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      for (let i = 0; i < 6; i++) {
        const artist = res.data[i];
        const name = artist.name;
        const numFans = artist.nb_fan;
        const img = artist.picture;
        console.log(name, numFans, img);
      }
    })
    .catch(err => console.log(err));

  return (
    <div>
      <p>Related artists</p>
    </div>
  );
};

export default Related;
