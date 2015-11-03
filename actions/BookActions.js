import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import $ from 'jQuery';

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

export function receieveBooks(json) {
  return {
    type: types.RECEIEVE_BOOKS,
    books: json.data,
    receivedAt: Date.now()
  }
}

export function fetchBooks(query) {
  const encodedQuery = encodeURIComponent(query);
  return (dispatch) => {
    dispatch(requestBooks(query))
    return fetch(`https://www.goodreads.com/search/index.xml?key=${GOODREADS_API_KEY}&q=${encodedQuery}`)
      .then((response) => $.parseXML(response))
      .then((json) => dispatch(receieveBooks(query, json)))
  }
}
