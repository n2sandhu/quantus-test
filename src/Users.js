import React, { Component } from 'react';
import SearchBox from "./searchBox";
import withServerRequest from './withServerRequest';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredUsers: nextProps.data });
  }

  renderUsersList() {
    if (this.props.errors.data) {
      return (
        <div className="users-container">{this.props.errors.data}</div>
      )
    }
    return (
      <div className="users-container">
        {this.state.filteredUsers.map(user => this.renderUsers(user))}
      </div>
    )
  }

  renderUsers(user) {
    return (
      <div key={user.name} className="col-12">
        <span>{user.name}</span> - {user.username}
      </div>
    )
  }

  render() {
    return (
      <div className="col-12">
        <header>
          <h1>Users</h1>
        </header>
        <SearchBox onSearch={this.props.onFilter} />
        {this.renderUsersList()}
      </div>
    );
  }
}
const validate = value => {
  let errors = { data: ''};
  if (!Array.isArray(value)) {
    errors.data = 'User data is invalid';
  }
  return { errors: errors }
};

const validationOptions = {
  validate: validate
};

export default withServerRequest(Users, 'http://localhost:3001/users', validationOptions);
