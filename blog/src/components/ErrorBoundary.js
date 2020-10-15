import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { isError: true };
  }
  render() {
    return (
      <div>
        {this.state.isError ? (
          <h1>somerhing went wrong</h1>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}