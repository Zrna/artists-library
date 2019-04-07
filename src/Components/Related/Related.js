import React, { useState, useCallback } from "react";

const Related = props => {
  // setup state
  const [artists, setArtists] = useState(null);
  const [error, setError] = useState(null);

  // setup click handler
  const getRelatedArtists = useCallback(async () => {
    try {
      // fetch data from API
      const res = await fetch(`/artist/${props.artistId}/related`);
      const json = await res.json();

      // set state
      setArtists(json.data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Unable to fetch related artists");
    }
  }, [props.artistId]);

  // setup render helper
  const renderArtist = (artist, key) => {
    console.log(artist);
    return (
      <div key={key} style={{ display: "inline-block" }}>
        <img src={artist.picture} alt={artist.name} />
        <p>{artist.name}</p>
        <p>Fans: {artist.nb_fan}</p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <p>Related artists</p>
        <button onClick={getRelatedArtists}>get</button>
      </div>
      {error}
      {artists && artists.map(renderArtist)}
    </div>
  );
};

export default Related;
