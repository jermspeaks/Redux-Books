import * as types from '../constants/ActionTypes';

const GOODREADS_API_KEY = 'Z0CC2Sg1ZL5I9vHbHrdBfg';

export function addBook(book) {
	return {
		type: types.ADD_BOOK,
		book
	};
}

export function editBook(book) {
  return {
    type: types.EDIT_BOOK,
    book
  }
}

export function deleteBook(id) {
	return {
		type: types.DELETE_BOOK,
		id
	};
}

export function requestBooks(query) {
  return {
    type: types.REQUEST_BOOKS
  }
}

export function receieveBooks(query, json) {
  console.log(query);
  console.log(json);
  return {
    type: types.RECEIVE_BOOKS,
    books: json.items,
    receivedAt: Date.now()
  }
}

export function fetchBooks(query) {
  return (dispatch) => {
    dispatch(requestBooks(query))
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then((json) => dispatch(receieveBooks(query, json)));
  }
}
