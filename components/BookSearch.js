import React, { Component,PropTypes } from 'react';

// Dumb React Component
export default class BookSearch extends Component {

  // Expectation to render BookSearch method
  static propTypes = {
    catalog: PropTypes.array.isRequired
  };

  constructor() {
    super();
  }

  render() {
    const {catalog} = this.props;
    return (
      <ol>
        {catalog.map((book, index) => <li key={index}>
          <p>{book.volumeInfo.title}</p>
          <p>{book.volumeInfo.description}</p>
          {book.volumeInfo.imageLinks ?
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> :
            null
          }
        </li>)}
      </ol>
    );
  }
}
