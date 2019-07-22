import { actionTypes } from './types';

import proxyurl from '../corsLink';
import store from '../store';

export const showProfile = artistId => dispatch => {
  const url = `${proxyurl}https://api.deezer.com/artist/${artistId}`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      const artistNumbers = {
        numAlbums: res.nb_album,
        numFans: res.nb_fan,
        showProfile: true
      };

      dispatch({
        type: actionTypes.SHOW_PROFILE,
        payload: artistNumbers
      });
    })
    .catch(err => console.log(err));

  console.log(store.getState());
};
