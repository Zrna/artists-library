/* eslint-disable no-unused-vars */

import React from 'react';

import { connect } from 'react-redux';

import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactAudioPlayer from 'react-audio-player';

import './Profile.scss';

import Related from '../Related/Related';

const Profile = props => {
  return (
    <div>
      <Modal isOpen={props.modal}>
        <Container>
          <ModalHeader toggle={props.close}>{props.artistName}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm='4' md='5' lg='4'>
                <img
                  src={props.artistImg}
                  alt={props.artistName}
                  className='mb-4'
                />
              </Col>
              <Col sm='8' md='7' lg='8'>
                <p>
                  <i className='fas fa-users' title='Fans' />
                  {props.numFans}
                </p>
                <p>
                  <i className='fas fa-music' title='Number of albums' />
                  {props.numAlbums}
                </p>
                <p>
                  <i className='fas fa-microphone' title='Songs' />
                  {props.songName}
                </p>
                <ReactAudioPlayer src={props.audio} controls />
              </Col>
            </Row>
            <Row>
              <Related artistId={props.artistId} />
            </Row>
          </ModalBody>
        </Container>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    artistId: state.getDataReducer.artistId,
    artistName: state.getDataReducer.artistName,
    artistImg: state.getDataReducer.artistImg,
    audio: state.getDataReducer.audio,
    songName: state.getDataReducer.songName,
    numFans: state.showProfileReducer.numFans,
    numAlbums: state.showProfileReducer.numAlbums
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
