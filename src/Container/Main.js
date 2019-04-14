import React, { Component, Fragment } from "react";
import { Container, InputGroup, Input, Button } from "reactstrap";

import "./Main.scss";

import Preview from "../Components/Preview/Preview";
import Profile from "../Components/Profile/Profile";

const initialState = {
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
  error: "",
  modal: false
};

class Main extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

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

  inputEnterSubmit = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.getApiData();
    }
  };

  showProfile = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      showProfile: true
    }));

    this.getArtistProfileData();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <Fragment>
        <section>
          <Container className="container-center">
            <h1 className="text-center pb-4">
              Search for your favorite artist
            </h1>
            <InputGroup>
              <Input
                value={this.inputValue}
                onChange={this.updateInputValue}
                placeholder="Type artist name"
                onKeyDown={this.inputEnterSubmit}
              />
              <Button type="submit" color="primary" onClick={this.getApiData}>
                Search
              </Button>
            </InputGroup>

            <p className="error-msg">{this.state.error}</p>
            {this.state.showProfile ? (
              <Profile
                profileImg={this.state.artistImg}
                artistName={this.state.artistName}
                artistId={this.state.artistId}
                numFans={this.state.numFans}
                numAlbums={this.state.numAlbums}
                albumTitle={this.state.albumTitle}
                audio={this.state.audio}
                close={this.reset}
                modal={this.state.modal}
                toggle={this.toggle}
              />
            ) : (
              <Preview
                profileImg={this.state.artistImg}
                artistName={this.state.artistName}
                showProfile={this.showProfile}
              />
            )}
          </Container>
        </section>
      </Fragment>
    );
  }
}

export default Main;
