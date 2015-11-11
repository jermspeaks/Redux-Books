import React, { Component, PropTypes } from 'react';
import styles from './BookInput.css';

// Dumb React Component
export default class BookInput extends Component {

  // Expectation to render BookList method
  static propTypes = {
    onBookSubmit: PropTypes.func.isRequired
  };

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.book;
    const text = node.value.trim();
    this.props.onBookSubmit({
      title: text
    });
    node.value = '';
  }

  render() {
    return (
      <div className='book--search__form'>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className='flex-container'>
            <input className='book--search__input' type='text' ref='book' />
            <button className='book--search__button' type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}
