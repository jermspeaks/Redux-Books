import React, { Component,PropTypes } from 'react';
// import styles from './BookSearchItem.css';

// Dumb React Component
export default class BookItem extends Component {

  // Expectation to render BookItem method
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageLinks: PropTypes.object,
    addBook: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };

  _handleClick(e) {
    e.preventDefault();
    
    this.props.addBook({
      title: this.props.title,
      id: this.props.id
    });
  }

  render() {
    const {title, description, imageLinks} = this.props;

    return (
      <div>
        <span className='book-title'>{title}</span>
        <span className='book-description'>{description}</span>
        {imageLinks ?
          <img className='book-cover' src={imageLinks.thumbnail} alt={title} /> :
          null
        }
        <button type='submit' onClick={(e) => this._handleClick(e)} >Add Book</button>
      </div>
    );
  }
}
