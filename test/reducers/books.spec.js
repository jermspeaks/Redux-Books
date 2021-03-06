import expect from 'expect';
import reducer from '../../reducers/books';
import * as types from '../../constants/ActionTypes';

const initialState = {
  requestingBooks: false,
  bookResults: [],
  library: []
};

const testBook = {
  id: 0,
  title: 'To Kill A Mockingbird'
};

const oneBookState = {
  requestingBooks: false,
  bookResults: [],
  library: [testBook]
};

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
    ).toEqual({
      requestingBooks: false,
      bookResults: [],
      library: [testBook]
    });
  });

  it('should edit a book from the book list', () => {
    const newBook = {
      id: 0,
      title: 'Little House on the Prairie'
    }

    expect(
      reducer(oneBookState, {
        type: types.EDIT_BOOK,
        book: {
          id: newBook.id,
          title: newBook.title
        }
      })
    ).toEqual({
      requestingBooks: false,
      bookResults: [],
      library: [newBook]
    });
  })

  it('should delete a book from the book list', () => {
    expect(
      reducer(oneBookState, {
        type: types.DELETE_BOOK,
        id: 0
      })
    ).toEqual(initialState);
  });
});
