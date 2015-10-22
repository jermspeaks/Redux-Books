import { ADD_BOOK } from '../constants/ActionTypes';

const initialState = [];

export default function books(state = initialState, action) {
  switch(action.type) {
    case ADD_BOOK:
      return [...state, {
        title: action.book
      }];
    default:
      return state;
  }
}
