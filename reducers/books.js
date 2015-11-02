import * as types from '../constants/ActionTypes';

const initialState = [];

export default function books(state = initialState, action) {
  switch(action.type) {
    case types.ADD_BOOK:
      return [...state, {
        // TODO Feels like a code smell
        id: state.reduce((maxId, book) => Math.max(book.id, maxId), -1) + 1,
        title: action.book
      }];
    case types.DELETE_BOOK:
      return state.filter((book) => {
        return book.id !== action.id
      });
    default:
      return state;
  }
}
