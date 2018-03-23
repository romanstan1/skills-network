import React, { Component } from 'react'
import humanize from 'string-humanize'
import PeopleFilters from './PeopleFilters'
import SkillsFilters from './SkillsFilters'
import ConnectionFilters from './ConnectionFilters'
import Collapsible from 'react-collapsible'
import {toggleFilter, toggleSelectAllFilter} from '../../../../store/modules/actions'
import {connect} from 'react-redux'


class Filters extends Component {

  handleFilterClick = (filterName, parentName) => {
    console.log("filterName, parentName",filterName, parentName)
    // this.props.dispatch(toggleFilter(filterName, parentName))
    // applyFilter()
  }
  handleSelectAllClick = (parentName) => {
    console.log('parentName: ', parentName)
    // this.props.dispatch(toggleSelectAllFilter(parentName))
    // applyFilter()
  }

  render() {
    const {people, connections, skills} = this.props
    return (
      <section className='filters'>

        <Collapsible
          triggerSibling={() =>
            <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
              parentName='connections' parentActive={connections.active}/>
            }
          transitionTime={100} trigger='Connections'>
          <ConnectionFilters handleFilterClick={this.handleFilterClick} connections={connections}/>
        </Collapsible>

        <Collapsible
          triggerSibling={() =>
            <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
              parentName='people' parentActive={people.active}/>
            }
          transitionTime={100} trigger='People'>
           <PeopleFilters />
        </Collapsible>

        <Collapsible
          triggerSibling={() =>
            <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
              parentName='skills' parentActive={skills.active}/>
            }
          transitionTime={100} trigger='Skills'>
           <SkillsFilters handleFilterClick={this.handleFilterClick} skillsFilters={skills.filters}/>
        </Collapsible>

      </section>
    )
  }
}

const TriggerSibling = ({parentName, parentActive, handleSelectAllClick}) =>
<div
  onClick={()=>handleSelectAllClick(parentName)}
  className={parentActive?`select-all active ${parentName}`:`select-all ${parentName}`}
  >
  <span></span>
</div>


export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills,
  connections: state.data.connections
}))(Filters)
