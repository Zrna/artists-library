import { actionTypes } from '../actions/types';

const initialState = {
  numAlbums: 0,
  numFans: 0
};

const showProfileReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.SHOW_PROFILE:
      return {
        ...state,
        numAlbums: action.payload.numAlbums,
        numFans: action.payload.numFans,
        showProfile: action.payload.showProfile
      };
    default:
      return newState;
  }
};

export default showProfileReducer;
