import React from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactAudioPlayer from "react-audio-player";

import "./Profile.scss";

import Related from "../Related/Related";

const Profile = props => {
  return (
    <div>
      <Modal isOpen={props.modal}>
        <Container>
          <ModalHeader toggle={props.close}>{props.artistName}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="4" md="5" lg="4">
                <img
                  src={props.profileImg}
                  alt={props.artistName}
                  className="mb-4"
                />
              </Col>
              <Col sm="8" md="7" lg="8">
                <p>
                  <i className="fas fa-users mr-4" title="Fans" />
                  {props.numFans}
                </p>
                <p>
                  <i className="fas fa-music mr-4" title="Number of albums" />
                  {props.numAlbums}
                </p>
                <p>
                  <i className="fas fa-microphone mr-4" title="Songs" />
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

export default Profile;
