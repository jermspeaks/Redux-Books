import React, {
  Component,
  PropTypes
} from 'react';

// Dumb React Component
export default class BookList extends Component {

  // Expectation to render BookList method
  static propTypes = {
    onBookEdit: PropTypes.func.isRequired,
    onBookDelete: PropTypes.func.isRequired,
    library: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired)
  };

  constructor() {
    super();
    this.state = {
      editing: false
    }
  }

  showEdit() {
    console.log('Changing State to Editing True');
    this.setState({
      editing: true
    });
  }

  render() {
    const {library, onBookDelete} = this.props;
    return (
      <ul>
        {library.map((book, index) => <li key={index}>
          {/* TODO Replace this with "book" component */}
          <span>{book.title}&nbsp;</span>
          <button onClick={() => {
            this.showEdit()
          }}>
            <span>Show Edit</span>
          </button>
          <button className='destroy' onClick={() => {
            onBookDelete(book.id)
          }}>Delete</button>
        </li>)}
      </ul>
    );
  }
}
