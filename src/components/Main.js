import React, { Component } from "react";

export default class main extends Component {
  render(props) {
    return (
      <div>
        <p>this is secret route {this.props.name}</p>
      </div>
    );
  }
}
