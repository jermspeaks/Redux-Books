import expect from 'expect';
import { addBook, deleteBook, editBook } from '../../actions/BookActions';
import * as types from '../../constants/ActionTypes';

describe('book actions', () => {
	it('should create an action to add a book', () => {
		const book = {
			id: 0,
			title: 'Gone With The Wind'
		};

		expect(addBook(book)).toEqual({
			type: 'ADD_BOOK',
			book: {
				id: 0,
				title: 'Gone With The Wind'
			}
		});
	});

	it('should create an action to edit a book', () => {
		const book = {
			id: 0,
			title: 'Gone With The Wind'
		};

		expect(editBook(book)).toEqual({
			type: 'EDIT_BOOK',
			book: book
		});
	});

	it('should create an action to delete a book', () => {
		const id = 0;

		expect(deleteBook(id)).toEqual({
			type: 'DELETE_BOOK',
			id: id
		});
	});
});
