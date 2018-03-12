import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import SliderWrap from './SliderWrap'
import _ from 'lodash'

class CollapsibleParent extends Component {

  state = {
    open: true
  }
  onOpen = () => {
    this.setState({open: !this.state.open})
  }
  render () {
    const {handleSelectAllClick, parent, trigger, children} = this.props
    const {open} = this.state
    return (
      <Collapsible
        // onOpen={this.onOpen}
        triggerSibling={() =>
          <div
            onClick={()=>handleSelectAllClick(parent.parentName)}
            className={parent.active?'select-all active':'select-all'}>
            <span></span>
          </div>
        }
        transitionTime={100} trigger={trigger}>
        {children}
      </Collapsible>
    )
  }
}

const ConnectionFilters = ({parent, handleFilterClick}) => <span>
  <div
    className={parent.filters[0].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[0].name, parent.parentName)} >
    <h4>{humanize('current_skills')}</h4>
    <span></span>
  </div>
  <SliderWrap/>
  <div
    className={parent.filters[1].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[1].name, parent.parentName)} >
    <h4>{humanize('desired_skills')}</h4>
    <span></span>
  </div>
</span>


class PeopleFilters extends Component {
  state = {
    groupBy: 'All'
  }
  handleGroupClick = (value) => {
    this.setState({groupBy: value})
  }
  render() {
    const {parent, handleFilterClick} = this.props
    const allPeople = parent

    return (
    <span>
      {/* <div onClick={()=> this.handleGroupClick(groupBy[1])}>
        {this.state.groupBy}
      </div> */}
      {
        allPeople.filters.map(filter =>
        <div
          key={filter.name}
          className={filter.active ? 'single-filter active':'single-filter'}
          onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
          <h4>{humanize(filter.name)}</h4>
          <span></span>
        </div>)
      }
    </span>
    )
  }
}

const SkillsFilters = ({parent, handleFilterClick}) => {
  return parent.filters.map(filter =>
    <div
      key={filter.name}
      className={filter.active ? 'single-filter active':'single-filter'}
      onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
      <h4>{humanize(filter.name)}</h4>
      <span></span>
    </div>
  )
}

const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>

        <CollapsibleParent
          parent={parent}
          handleSelectAllClick={handleSelectAllClick}
          trigger={humanize(parent.parentName)}>

          { parent.parentName === 'connections'?
            <ConnectionFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
          { parent.parentName === 'people'?
            <PeopleFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }
          { parent.parentName === 'skills'?
            <SkillsFilters handleFilterClick={handleFilterClick} parent={parent}/> :null
          }

        </CollapsibleParent>
      </span>
    ))
  }
</section>

export default Filters
