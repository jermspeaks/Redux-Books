import React, { Component, PropTypes } from 'react';

// Dumb React Component
export default class BookList extends Component {

 // Expectation to render BookList method
  static propTypes = {
    onBookDelete: PropTypes.func.isRequired,
    library: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired)
  };

  constructor() {
    super();
  }

  handleDelete(e) {
    e.preventDefault();

  }

  render() {
    const { library, onBookDelete } = this.props;
    return (
      <ul>
        {library.map((book, index) =>
          <li key={index}>
            <span>{book.title}&nbsp;</span>
            <button
              className='destroy'
              value='Delete'
              onClick={() => { onBookDelete(book.id) }}></button>
          </li>
        )}
      </ul>
    );
  }
}
