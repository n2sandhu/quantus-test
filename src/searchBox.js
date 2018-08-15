import React, { Component } from 'react';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    const criteria =  event.target.value.trim();
    this.props.onSearch(criteria);

  }

  render() {
    return (
      <div className="offset-4 col-4">
        <form>
          <fieldset className="form-group">
            <input type="text"
                   className="form-control"
                   placeholder="Search by name"
                   onChange={this.handleSearch} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default SearchBox;