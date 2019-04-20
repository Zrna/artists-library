import React, { Component, Fragment } from "react";
import { Container, InputGroup, Input, Button } from "reactstrap";

import "./Main.scss";

import Preview from "../Components/Preview/Preview";
import Profile from "../Components/Profile/Profile";
import Footer from "../Components/Footer/Footer";

const initialState = {
  inputValue: "",
  artistImg: "",
  artistName: "",
  artistId: null,
  numFans: null,
  numAlbums: null,
  audio: "",
  songName: "",
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
          songName: "",
          showProfile: false
        });
        this.setData(res);
      })
      .catch(err => {
        // checking if input field contains only space/spaces OR is empty string
        if (
          /^\s+$/.test(this.state.inputValue) ||
          this.state.inputValue === ""
        ) {
          this.setState({ error: "Input field can't be empty!" });
        } else {
          this.setState({
            error: `Unable to find ${this.state.inputValue}`
          });
        }
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
      const data = res.data[n];
      const songName = `${data.title}, `;

      this.setState(prevState => ({
        songName: [...prevState.songName, songName]
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
              Search for your favorite music artist
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
                songName={this.state.songName}
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
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
