import React, { Component,PropTypes } from 'react';

// Dumb React Component
export default class BookItem extends Component {

  // Expectation to render BookItem method
  static propTypes = {
    onBookEdit: PropTypes.func.isRequired,
    onBookDelete: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      editing: false
    }
  }

  showEdit() {
    this.setState({
      editing: true,
      title: this.props.title
    });
  }

  handleBookEdit(e) {
    e.preventDefault();
    const node = this.refs.item;
    const text = node.value.trim();
    this.props.onBookEdit({
      title: text,
      id: this.props.id
    });
    this.setState({
      editing: false
    });
  }

  handleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleKeyDown(e) {
    if (e.which === 13) {
      this.handleBookEdit(e);
    }
  }

  handleDoubleClick() {
    this.showEdit();
  }

  render() {
    const {title, onBookDelete} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <div>
          <input ref='item'
            value={this.state.title}
            editing={this.state.editing}
            onChange={ (e) => this.handleChange(e) }
            onKeyDown={ (e) => this.handleKeyDown(e) } />
          <button onClick={(e) => { this.handleBookEdit(e) }}>Save</button>
        </div>
      );
    } else {
      element = (
        <div className="view">
          <span onDoubleClick={ () => this.handleDoubleClick() }>{title} </span>
          <button onClick={() => { this.showEdit() }}>
            <span>Show Edit</span>
          </button>
          <button className='destroy' onClick={() => {
            onBookDelete(this.props.id)
          }}>Delete</button>
        </div>
      )
    }

    return (
      <div>
        {element}
      </div>
    );
  }
}
