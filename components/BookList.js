import React, { Component,PropTypes } from 'react';
import BookItem from './BookItem';

// Dumb React Component
export default class BookList extends Component {

  // Expectation to render BookList method
  static propTypes = {
    onBookEdit: PropTypes.func.isRequired,
    onBookDelete: PropTypes.func.isRequired,
    library: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired)
  };

  constructor() {
    super();
    this.state = {
      editing: false
    }
  }

  showEdit() {
    console.log('Changing State to Editing True');
    this.setState({
      editing: true
    });
  }

  render() {
    const {library, onBookEdit, onBookDelete} = this.props;
    return (
      <ul>
        {library.map((book, index) => <li key={index}>
          <BookItem
            onBookEdit={this.props.onBookEdit}
            onBookDelete={this.props.onBookDelete}
            title={book.title}
            id={book.id} />
        </li>)}
      </ul>
    );
  }
}
