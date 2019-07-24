/* eslint-disable no-unused-vars */

import React, { useState, useCallback, useEffect } from 'react';

import './Related.scss';

import proxyurl from '../../corsLink';

const Related = props => {
  // setup state
  const [artists, setArtists] = useState(null);
  const [error, setError] = useState(null);

  // setup click handler
  const getRelatedArtists = useCallback(async() => {
    try {
      // fetch data from API
      const url = `${proxyurl}https://api.deezer.com`;

      const res = await fetch(`${url}/artist/${props.artistId}/related`);
      const json = await res.json();

      // set state
      setArtists(json.data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Unable to find related artists');
    }
  }, [props.artistId]);

  // Used to automatic display related artists when Component is mounted
  useEffect(() => {
    getRelatedArtists();
  }, []);

  // setup render helper
  const renderArtist = (artist, key) => {
    return (
      <div key={key} className='related-artist-box'>
        <img src={artist.picture} alt={artist.name} className='relatedImg' />
        <p>{artist.name}</p>
        <p>Fans: {artist.nb_fan}</p>
      </div>
    );
  };

  return (
    <div className='mt-4'>
      <div>
        <p>Related artists</p>
      </div>
      {error}
      {artists && artists.slice(0, 14).map(renderArtist)}
    </div>
  );
};

export default Related;
