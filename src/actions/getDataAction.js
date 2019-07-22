import { actionTypes } from './types';

import proxyurl from '../corsLink';

export const getApiData = inputValue => dispatch => {
  const url = `${proxyurl}https://api.deezer.com/search?q=artist:"${inputValue}"`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const data = res.data[0];

      // looping through response to save all songs name => saved in 'const songsName'
      const saveAllSongs = res => {
        let songName = '';
        for (let n in res.data) {
          const data = res.data[n];
          songName += `${data.title}, `;
        }
        return songName;
      };

      const songsName = saveAllSongs(res);

      const artist = {
        artistId: data.artist.id,
        artistName: data.artist.name,
        artistImg: data.artist.picture_medium,
        audio: data.preview,
        songName: songsName,
        showPreview: true,
        loader: false
      };

      dispatch({
        type: actionTypes.GET_API_DATA,
        payload: artist
      });
    })
    .catch(err => {
      console.log(err);
      let setError = {};

      // checking if input field contains only space/spaces OR is empty string
      if (/^\s+$/.test(inputValue) || inputValue === '') {
        setError = {
          error: "Input field can't be empty!",
          loader: false
        };
        dispatch({
          type: actionTypes.GET_API_DATA,
          payload: setError
        });
      } else {
        setError = {
          error: `Unable to find ${inputValue}`,
          loader: false
        };

        dispatch({
          type: actionTypes.GET_API_DATA,
          payload: setError
        });
      }
    });
};
