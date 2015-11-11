import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookInput from '../components/BookInput';
import BookSearch from '../components/BookSearch';
import BookList from '../components/BookList';
import * as BookActions from '../actions/BookActions';
import style from './BookApp.css';

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
        <header>
          <div className='header-container'>
            <span className='header-logo'>Redux Library</span>
          </div>
        </header>
        <div className='flex-container'>
          <section className='search-container'>
            <BookInput
              onBookSubmit={actions.fetchBooks}
            />
            <div className='search-notice'>
              <span className='search-notice__text'>{notice}</span>
            </div>
            <BookSearch
              catalog={books.bookResults}
              onBookAdd={actions.addBook}
            />
          </section>
          <section className='library-container'>
            <BookList
              onBookEdit={actions.editBook}
              onBookDelete={actions.deleteBook}
              library={books.library}
            />
          </section>
        </div>
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
