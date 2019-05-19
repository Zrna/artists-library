import proxyurl from "../corsLink";

export const getApiData = inputValue => dispatch => {
  const url = `${proxyurl}https://api.deezer.com/search?q=artist:"${inputValue}"`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const data = res.data[0];

      // for (let n in res.data) {
      //   const data = res.data[n];
      //   const songName = `${data.title}, `;

      //   this.setState(prevState => ({
      //     songName: [...prevState.songName, songName]
      //   }));
      // }

      const artist = {
        artistId: data.artist.id,
        artistName: data.artist.name,
        artistImg: data.artist.picture_medium,
        audio: data.preview,
        songName: data.title
      };

      dispatch({
        type: "GET_API_DATA",
        payload: artist
      });
    })
    .catch(err => {
      let setError = {};

      // checking if input field contains only space/spaces OR is empty string
      if (/^\s+$/.test(inputValue) || inputValue === "") {
        setError = {
          error: "Input field can't be empty!",
          loader: false
        };
        dispatch({
          type: "GET_API_DATA",
          payload: setError
        });
      } else {
        setError = {
          error: `Unable to find ${inputValue}`,
          loader: false
        };

        dispatch({
          type: "GET_API_DATA",
          payload: setError
        });
      }
    });
};
