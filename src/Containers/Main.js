/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getApiData } from '../actions/getDataAction';
import { showProfile } from '../actions/showProfileAction';

import { Container } from 'reactstrap';
import './Main.scss';

import HomePage from './HomePage/HomePage';
import Preview from '../Components/Preview/Preview';
import Profile from '../Components/Profile/Profile';
import Footer from '../Components/Footer/Footer';

const initialState = {
  artistId: null,
  modal: false
};

class Main extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  // API request for Artist profile
  getArtistProfileData = () => {
    const artistId = this.props.artistId;
    this.props.showProfile(artistId);
  };

  showProfile = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getArtistProfileData();
  };

  reset = () => {
    this.setState(initialState);
  };

  render () {
    return (
      <Fragment>
        <section>
          <Container className='container-center'>
            <HomePage />

            {this.props.showPreview ? (
              <Preview showProfile={this.showProfile} />
            ) : null}

            <Profile
              close={this.reset}
              modal={this.state.modal}
              toggle={this.toggle}
            />
          </Container>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    artistId: state.getDataReducer.artistId,
    showPreview: state.getDataReducer.showPreview,
    showProfile: state.showProfileReducer.showProfile
  };
};

export default connect(
  mapStateToProps,
  { getApiData, showProfile }
)(Main);
