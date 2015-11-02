import * as types from '../constants/ActionTypes';

const initialState = [];

export default function books(state = initialState, action) {
  switch(action.type) {
    case types.ADD_BOOK:
      return [...state, {
        // TODO still feels like a code smell
        id: action.book.id,
        title: action.book.title
      }];
    case types.DELETE_BOOK:
      return state.filter((book) => {
        return book.id !== action.id
      });
    default:
      return state;
  }
}
