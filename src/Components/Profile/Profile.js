import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ReactAudioPlayer from "react-audio-player";

import "./Profile.scss";

import Related from "../Related/Related";

const Profile = props => {
  return (
    <div>
      <Modal isOpen={props.modal}>
        <Container>
          <ModalHeader toggle={props.toggle}>{props.artistName}</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <img src={props.profileImg} alt={props.artistName} />
              </Col>
              <Col>
                <p>
                  <i class="fas fa-users mr-4" title="Fans" />
                  {props.numFans}
                </p>
                <p>
                  <i class="fas fa-music mr-4" title="Number of albums" />
                  {props.numAlbums}
                </p>
                <p>Albums names: {props.albumTitle}</p>
                <ReactAudioPlayer src={props.audio} controls />
              </Col>
            </Row>
            <Row>
              <Related artistId={props.artistId} />
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.close} color="secondary">
              Close
            </Button>
          </ModalFooter>
        </Container>
      </Modal>
    </div>
  );
};

export default Profile;
