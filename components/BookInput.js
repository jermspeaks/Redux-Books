import React, { Component, PropTypes } from 'react';

// Dumb React Component
export default class BookInput extends Component {

  // Expectation to render BookList method
  static propTypes = {
    onBookSubmit: PropTypes.func.isRequired
  };

  render() {
    const { onBookSubmit } = this.props;
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' ref='book' placeholder='enter book' />
          <button type='submit'>Add Book</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.book;
    const text = node.value.trim();
    this.props.onBookSubmit(text);
    node.value = '';
  }
}
