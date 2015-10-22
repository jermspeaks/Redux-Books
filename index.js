import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

// Dumb React Component
class BookInput extends Component {
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

// Expectation to render BookList method
BookInput.propTypes = {
  onBookSubmit: PropTypes.func.isRequired
};

// Dumb React Component
class BookList extends Component {
  render() {
    return (
      <ul>
        {this.props.library.map((book, index) =>
          <li key={index}>{book.title}</li>
        )}
      </ul>
    );
  }
}

// Expectation to render BookList method
BookList.propTypes = {
  library: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired)
};

// Smart React Component
class App extends Component {
  // Map Redux actions to component props
  render() {
    // Injected by connect() call:
    const { dispatch, books } = this.props;
    return (
      <div>
        <BookInput onBookSubmit={(book) => dispatch(addBook(book))} />
        <BookList library={books} />
      </div>
    );
  }
}

// Actions:
const ADD_BOOK = 'ADD_BOOK';

// Action Creators:
function addBook(book) {
  return { type: ADD_BOOK, book };
}

// Reducers:
function books(state=[], action) {
  switch(action.type) {
    case ADD_BOOK:
      return [...state, {
        title: action.book
      }];
    default:
      return state;
  }
}

const reducers = combineReducers({
  books
})

// Middlewares
/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}

// Store:
// let store = createStore(books);

// applyMiddleware takes createStore() and returns
// a function with a compatible API.
let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore);

// Use it like you would use createStore()
let store = createStoreWithMiddleware(reducers);

// Map Redux state to component props
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    books: state.books
  };
}

// Connected Component:
let Root = connect(select)(App);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
