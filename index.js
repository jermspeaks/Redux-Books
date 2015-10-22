import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// React component
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

// Store:
let store = createStore(books);

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    books: state.books
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onBookSubmit: book => dispatch(addBook(book))
  };
}

// Connected Component:
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookInput);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
