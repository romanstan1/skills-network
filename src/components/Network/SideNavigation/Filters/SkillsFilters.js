import React, {Component} from 'react';
import humanize from 'string-humanize'
import {TextFilter} from 'react-text-filter';
import SingleFilter from './SingleFilter';
import collapsibleHOC from './collapsibleHOC'
import {connect} from 'react-redux'
import searchHOC from './searchHOC'

const skillFilterFunc = filter => skill => skill.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1

class SkillsFilters extends Component {
  // state = { filter: '' }
  //
  // updateSearch = (e) => this.setState({filter: e.target.value})

  render() {
    let {filters} = this.props
    // filters = this.state.filter ? filters.filter(skillFilterFunc(this.state.filter)) : filters.slice(0)

    return (
    <span>
      {/* <TextFilter
        minLength={0}
        debounceTimeout={0}
        placeholder="Search"
        className="search-box"
        onFilter={this.updateSearch}>
      </TextFilter> */}

      {
        filters.map(filter =>
          <SingleFilter key={filter.name} filter={filter} parentName='skills'/>)
      }
    </span>
    )
  }
}

export default connect(state => ({
  filters: state.data.skills.filters
}))(collapsibleHOC(searchHOC(SkillsFilters)))


// <div
//   key={skill.name}
//   className={skill.active ? 'single-filter active skills':'single-filter skills'}
//   onClick={()=>handleFilterClick(skill.name, 'skills')} >
//   <h4>{skill.name}</h4>
//   <span></span>
// </div>
