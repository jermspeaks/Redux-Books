import React, { Component, PropTypes } from 'react';

// Dumb React Component
export default class BookList extends Component {

 // Expectation to render BookList method
  static propTypes = {
    library: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired)
  };

  constructor() {
    super();
  }

  render() {
    return (
      <ul>
        {this.props.library.map((book, index) =>
          <li key={index}>{book.title}</li>
        )}
      </ul>
    );
  }
}
