import React, { Component } from 'react';
import invokeAlert from '../helper/alertMsg';

export class notFound extends Component {
  componentDidMount() {
    invokeAlert(alert, 'Not Found');
  }

  render() {
    return (
      <div>
        Not Found
      </div>
    );
  }
}

export default notFound;
