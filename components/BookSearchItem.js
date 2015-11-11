import React, { Component,PropTypes } from 'react';
import styles from './BookSearchItem.css';

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

  createShortDescription() {
    const {description} = this.props;
    return description ? (
      <div>
        {description.length > 255 ? description.substring(0, 255) + '...' : description}
      </div>
    ) : (
      <div></div>
    )
  }

  render() {
    const {title, imageLinks} = this.props;

    return (
      <div>
        <div className='book--title'>
          <span>{title}</span>
        </div>
        <section className='book--details'>
          <div className='book--cover'>{imageLinks ?
            <img src={imageLinks.thumbnail} alt={title} /> :
            null}
          </div>
          <div className='book--description'>
            <span>{this.createShortDescription()}</span>
            <button className='book--description__button' type='submit' onClick={(e) => this._handleClick(e)} >Add Book</button>
          </div>
        </section>
      </div>
    );
  }
}
