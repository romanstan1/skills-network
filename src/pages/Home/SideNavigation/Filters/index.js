import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import PeopleFilters from "./PeopleFilters"
import SkillsFilters from "./SkillsFilters"
import ConnectionFilters from "./ConnectionFilters"

const Filters = ({connections, people, skills}) =>
  <section className="filters">
    <ConnectionFilters active={connections.active} parentName="connections" />
    <PeopleFilters active={people.active} parentName="people" />
    <SkillsFilters active={skills.active} parentName="skills" />
  </section>

const mapState = (state) => ({
  people: state.data.people,
  skills: state.data.skills,
  connections: state.data.connections
})

export default connect(mapState)(Filters)

Filters.propTypes = {
  connections: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired
}
