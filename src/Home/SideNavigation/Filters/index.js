import React from 'react'
import PeopleFilters from './PeopleFilters'
import SkillsFilters from './SkillsFilters'
import ConnectionFilters from './ConnectionFilters'
import {connect} from 'react-redux'

const Filters = ({connections, people, skills}) =>
  <section className='filters'>
    <ConnectionFilters active={connections.active} parentName='connections'/>
    <PeopleFilters active={people.active} parentName='people'/>
    <SkillsFilters active={skills.active} parentName='skills'/>
  </section>

export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills,
  connections: state.data.connections
}))(Filters)
