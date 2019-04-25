import React, { Fragment } from "react";
import { InputGroup, Input, Button } from "reactstrap";

import "../../Container/Main.scss";

import Loader from "../Loader/Loader";

const HomePage = props => {
  return (
    <Fragment>
      <h1 className="text-center pb-4">
        Search for your favorite music artist
      </h1>
      <InputGroup>
        <Input
          value={props.value}
          onChange={props.onChange}
          placeholder="Type artist name"
          onKeyDown={props.onKeyDown}
        />
        <Button type="submit" color="primary" onClick={props.onClick}>
          Search
        </Button>
      </InputGroup>
      <p className="error-msg">{props.error}</p>
      <div>{props.loader ? <Loader /> : null}</div>
    </Fragment>
  );
};

export default HomePage;
