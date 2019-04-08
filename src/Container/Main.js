import React, { Component } from "react";

import Preview from "../Components/Preview/Preview";
import Profile from "../Components/Profile/Profile";

class Main extends Component {
  state = {
    inputValue: "",
    artistImg: "",
    artistName: "",
    artistId: null,
    numFans: null,
    numAlbums: null,
    audio: "",
    albumTitle: "",
    showProfile: false,
    relatedArtist: "",
    error: ""
  };

  // Get input data
  updateInputValue = event => {
    const artistName = event.target.value;
    this.setState({
      inputValue: artistName,
      showProfile: false,
      error: ""
    });
  };

  // API request
  getApiData = () => {
    const url = `/search?q=artist:"${this.state.inputValue}"`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          albumTitle: "",
          showProfile: false
        });
        this.setData(res);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: `Unable to find ${this.state.inputValue}`
        });
      });
  };

  // Setting data to show
  setData = res => {
    console.log(res);

    const data = res.data[0];

    const artistId = data.artist.id;
    const artistName = data.artist.name;
    const artistImg = data.artist.picture_medium;
    const audio = data.preview;

    for (let n in res.data) {
      const obj = res.data[n];
      const albumTitle = `${obj.title}, `;

      this.setState(prevState => ({
        albumTitle: [...prevState.albumTitle, albumTitle]
      }));
    }

    this.setState({
      artistId,
      artistName,
      artistImg,
      audio
    });
  };

  // API request for Artist profile
  getArtistProfileData = () => {
    const url = `/artist/${this.state.artistId}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const numAlbums = res.nb_album;
        const numFans = res.nb_fan;

        this.setState({
          numAlbums,
          numFans
        });
      })
      .catch(err => console.log(err));
  };

  showProfile = () => {
    this.setState({
      showProfile: true
    });

    this.getArtistProfileData();
  };

  render() {
    return (
      <div>
        <input value={this.inputValue} onChange={this.updateInputValue} />
        <button onClick={this.getApiData}>click</button>

        <p>{this.state.error}</p>
        {this.state.showProfile ? (
          <Profile
            profileImg={this.state.artistImg}
            artistName={this.state.artistName}
            artistId={this.state.artistId}
            numFans={this.state.numFans}
            numAlbums={this.state.numAlbums}
            albumTitle={this.state.albumTitle}
            audio={this.state.audio}
          />
        ) : (
          <Preview
            profileImg={this.state.artistImg}
            artistName={this.state.artistName}
            showProfile={this.showProfile}
          />
        )}
      </div>
    );
  }
}

export default Main;
