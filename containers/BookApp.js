import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookInput from '../components/BookInput';
import BookSearch from '../components/BookSearch';
import BookList from '../components/BookList';
import * as BookActions from '../actions/BookActions';

// Smart React Component
class BookApp extends Component {
  // Map Redux actions to component props
  createNotice(results) {
    if (results.length === 0) {
      return (
        <div>
          <span>Search for a book</span>
        </div>
      );
    }
  }

  render() {
    // Injected by connect() call:
    const { books, actions } = this.props;
    let notice = this.createNotice(books.bookResults);

    return (
      <div>
        <BookInput
          onBookSubmit={actions.fetchBooks}
        />
        <BookSearch
          catalog={books.bookResults}
          onBookAdd={actions.addBook}
        />
        {notice}
        <BookList
          onBookEdit={actions.editBook}
          onBookDelete={actions.deleteBook}
          library={books.library}
        />
      </div>
    );
  }
}

function mapState(state) {
  return {
    books: state.books
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(BookActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(BookApp);
