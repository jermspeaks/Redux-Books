import * as types from '../constants/ActionTypes';

const initialState = [];

export default function books(state = initialState, action) {
  switch(action.type) {
    case types.ADD_BOOK:
      return [...state, {
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        title: action.book.title
      }];
    case types.EDIT_BOOK:
      return state.map((book) =>
        book.id === action.id ?
          Object.assign({}, book, {
            title: action.title
          }) : book
      );
    case types.DELETE_BOOK:
      return state.filter((book) => {
        return book.id !== action.id
      });
    default:
      return state;
  }
}
