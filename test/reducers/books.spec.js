import expect from 'expect';
import reducer from '../../reducers/books'
import * as types from '../../constants/ActionTypes'

const initialState = [];
const testBook = {
  id: 0,
  title: 'To Kill A Mockingbird'
};
const oneBookState = [testBook];

describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).toEqual(initialState);
  });

  it('should add a book from the book list', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_BOOK,
        book: testBook
      })
    ).toEqual([testBook]);
  });

  it('should delete a book from the book list', () => {
    expect(
      reducer(oneBookState, {
        type: types.DELETE_BOOK,
        id: 0
      })
    ).toEqual(initialState);
  });
});
