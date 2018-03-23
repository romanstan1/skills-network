import React, {Component} from 'react';
import humanize from 'string-humanize'
import {TextFilter} from 'react-text-filter';

const skillFilterFunc = filter => skill => skill.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1

export class SkillsFilters extends Component {
  state = { filter: '' }
  
  updateSearch = (e) => this.setState({filter: e.target.value})

  render() {
    let {skillsFilters, handleFilterClick} = this.props
    skillsFilters = this.state.filter ? skillsFilters.filter(skillFilterFunc(this.state.filter)) : skillsFilters.slice(0)

    return (<span>
      <TextFilter
        minLength={0}
        debounceTimeout={0}
        placeholder="Search"
        className="search-box"
        onFilter={this.updateSearch}>
      </TextFilter>

      {
        skillsFilters.map(skill =>
          <div
            key={skill.name}
            className={skill.active ? 'single-filter active skills':'single-filter skills'}
            onClick={()=>handleFilterClick(skill.name, 'skills')} >
            <h4>{skill.name}</h4>
            <span></span>
          </div>
        )
      }
    </span>)
  }
}


export default SkillsFilters
