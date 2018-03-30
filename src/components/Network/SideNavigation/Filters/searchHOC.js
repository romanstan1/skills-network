import React, {Component} from 'react';
import humanize from 'string-humanize'
import {TextFilter} from 'react-text-filter';

const filterFunc = filterBy => item => item.name.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1

const searchHOC = (PassedComponent) => class SearchHoc extends Component {
  state = { filterBy: '' }
  updateSearch = (e) => this.setState({filterBy: e.target.value})

  render() {
    let {filters} = this.props
    filters = this.state.filterBy ? filters.filter(filterFunc(this.state.filterBy)) : filters.slice(0)
    return (
    <span>
      <TextFilter
        minLength={0}
        debounceTimeout={0}
        placeholder="Search"
        className="search-box"
        onFilter={this.updateSearch}>
      </TextFilter>
      <PassedComponent filters={filters}/>
    </span>
    )
  }
}

export default searchHOC
