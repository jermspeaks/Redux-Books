import * as types from '../constants/ActionTypes';

const initialState = {
  requestingBooks: false,
  bookResults: [],
  library: []
};

export default function books(state = initialState, action) {
  const oldLibrary = state.library;
  switch(action.type) {
    case types.ADD_BOOK:
      return Object.assign({}, state, {
        library: [{
          title: action.book.title,
          id: action.book.id
        }, ...oldLibrary]
      });
    case types.REQUEST_BOOKS:
      return Object.assign({}, state, {
        requestingBooks: true
      });
    case types.RECEIVE_BOOKS:
      return Object.assign({}, state, {
        requestingBooks: false,
        bookResults: action.books
      });
    case types.EDIT_BOOK:
      return Object.assign({}, state, {
        library: oldLibrary.map((book) =>
          book.id === action.book.id ?
            Object.assign({}, book, {
              title: action.book.title
            }) : book
        )
      });
    case types.DELETE_BOOK:
      return Object.assign({}, state, {
        library: oldLibrary.filter((book) => {
          return book.id !== action.id;
        })
      });
    default:
      return state;
  }
}
