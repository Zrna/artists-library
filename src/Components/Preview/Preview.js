/* eslint-disable no-unused-vars */

import React from 'react';
import { connect } from 'react-redux';

import './Preview.scss';

const ArtistPreview = props => {
  return (
    <div className='text-center' style={{ backgroundColor: '#f5f5f5' }}>
      <img
        src={props.artistImg}
        alt={props.artistName}
        onClick={props.showProfile}
        className='previewImg'
      />
      <p className='artist-name'>{props.artistName}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    artistId: state.getDataReducer.artistId,
    artistName: state.getDataReducer.artistName,
    artistImg: state.getDataReducer.artistImg
  };
};

export default connect(
  mapStateToProps,
  null
)(ArtistPreview);
