// HOC that validates the data fetched from API is an array
import React, { Component } from 'react';
import axios from 'axios';

export default function withServerRequest(WrappedComponent, dataRequestUrl, options) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.filterList = this.filterList.bind(this);
      this.validate = options.validate;
      this.state = {
        errors: { data: '' },
        data: [],
        filteredData: [],
        isFetching: true
      }
    }

    filterList(value) {
      let updatedList = this.state.data;
      updatedList = updatedList.filter(item => {
        return item.name.toLowerCase().search(
            value.toLowerCase()) !== -1;
      });
      this.setState({filteredData: updatedList});
    }

    runValidate(value) {
      this.setState(this.validate(value));
    }

    componentDidMount() {
      this.setState({
        isFetching: true,
        errors: { data: '' }
      });
      axios.get(dataRequestUrl)
        .then(({data}) => {
          this.runValidate(data);
          this.setState({
            data,
            filteredData: data,
            isFetching: false
          })
        })
        .catch(err => {
          this.setState({
            errors: { data: JSON.stringify(err) },
            isFetching: false
          });
        });
    }

    render() {
      return <WrappedComponent data={this.state.filteredData} onFilter={this.filterList} errors={this.state.errors} />;
    }
  };
}
