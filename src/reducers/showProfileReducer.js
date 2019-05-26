const initialState = {
  numAlbums: 0,
  numFans: 0
};

const showProfileReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "SHOW_PROFILE":
      console.log("SHOW_PROFILE reducer okinut");
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
