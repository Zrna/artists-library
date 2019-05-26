const initialState = {
  artistName: ""
};

const getDataReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "GET_API_DATA":
      console.log("GET_API_DATA reducer okinut");
      return {
        ...newState,
        artistId: action.payload.artistId,
        artistName: action.payload.artistName,
        artistImg: action.payload.artistImg,
        audio: action.payload.audio,
        songName: action.payload.songName,
        error: action.payload.error,
        loader: action.payload.loader,
        showPreview: action.payload.showPreview
      };
    default:
      return newState;
  }
};

export default getDataReducer;
