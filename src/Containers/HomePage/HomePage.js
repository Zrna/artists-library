/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getApiData } from '../../actions/getDataAction';
import { InputGroup, Input, Button } from 'reactstrap';

import '../Main.scss';

import Loader from '../../Components/Loader/Loader';

class HomePage extends Component {
  constructor () {
    super();
    this.state = {
      inputValue: '',
      loader: false
    };
  }

  // Main API request
  getApiData = () => {
    this.setState({
      loader: true
    });

    const inputValue = this.state.inputValue;
    this.props.getApiData(inputValue);
  };

  // Get input data
  updateInputValue = event => {
    const artistName = event.target.value;
    this.setState({
      inputValue: artistName,
      error: '',
      showPreview: false
    });
  };

  inputEnterSubmit = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.getApiData();
    }
  };

  render () {
    return (
      <Fragment>
        <h1 className='text-center pb-4'>
          Search for your favorite music artist
        </h1>
        <InputGroup>
          <Input
            value={this.state.inputValue}
            onChange={this.updateInputValue}
            placeholder='Type artist name'
            onKeyDown={this.inputEnterSubmit}
          />
          <Button type='submit' color='primary' onClick={this.getApiData}>
            Search
          </Button>
        </InputGroup>
        {this.state.loader && this.props.loader !== false ? <Loader /> : null}
        <p className='error-msg'>{this.props.error}</p>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.getDataReducer.error,
    loader: state.getDataReducer.loader
  };
};

export default connect(
  mapStateToProps,
  { getApiData }
)(HomePage);
