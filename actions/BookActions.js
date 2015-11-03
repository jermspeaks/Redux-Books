import * as types from '../constants/ActionTypes';

export function addBook(book) {
	return {
		type: types.ADD_BOOK,
		book
	};
}

export function editBook(book, id) {
  return {
    type: types.EDIT_BOOK,
    book,
    id
  }
}

export function deleteBook(id) {
	return {
		type: types.DELETE_BOOK,
		id
	};
}
