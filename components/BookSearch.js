import React, { Component,PropTypes } from 'react';
import BookSearchItem from './BookSearchItem';
import styles from './BookSearch.css';

// Dumb React Component
export default class BookSearch extends Component {

  // Expectation to render BookSearch method
  static propTypes = {
    catalog: PropTypes.array.isRequired,
    onBookAdd: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const {catalog, onBookAdd} = this.props;
    return (
      <ul className='book--list'>
        {catalog.map((book, index) => <li key={index} className='book--list__list-item'>
          <BookSearchItem
            title={book.volumeInfo.title}
            description={book.volumeInfo.description}
            imageLinks={book.volumeInfo.imageLinks}
            addBook={onBookAdd}
            id={index} />
        </li>)}
      </ul>
    );
  }
}
