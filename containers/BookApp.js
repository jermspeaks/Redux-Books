import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookInput from '../components/BookInput';
import BookList from '../components/BookList';
import * as BookActions from '../actions/BookActions';

// Smart React Component
class BookApp extends Component {
  // Map Redux actions to component props
  render() {
    // Injected by connect() call:
    const { books, actions } = this.props;
    return (
      <div>
        <BookInput
          onBookSubmit={actions.addBook}
        />
        <BookList
          onBookEdit={actions.editBook}
          onBookDelete={actions.deleteBook}
          library={books}
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
