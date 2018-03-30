import React from 'react';
import SingleFilter from './SingleFilter';
import collapsibleHOC from './collapsibleHOC'
import {connect} from 'react-redux'
import searchHOC from './searchHOC'

const SkillsFilters = ({filters}) =>
  <span>
    { filters.map(filter =>
        <SingleFilter key={filter.name} filter={filter} parentName='skills'/>)
    }
  </span>

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
