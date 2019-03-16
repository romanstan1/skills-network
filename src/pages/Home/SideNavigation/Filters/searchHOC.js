import React, {Component} from "react"
import {TextFilter} from "react-text-filter"
import PropTypes from "prop-types"

const filterFunc = (filterBy) => (item) => item.name.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1

const searchHOC = (PassedComponent) => class SearchHoc extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired
  }
  state = {filterBy: ""}
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
          onFilter={this.updateSearch} />
        <PassedComponent filters={filters} />
      </span>
    )
  }
}

export default searchHOC
