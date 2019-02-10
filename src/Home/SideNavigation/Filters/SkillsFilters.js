import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import SingleFilter from "./SingleFilter"
import collapsibleHOC from "./collapsibleHOC"
import searchHOC from "./searchHOC"

const SkillsFilters = ({filters}) =>
  <span>
    {
      filters.map((filter) =>
        <SingleFilter
          key={filter.name}
          filter={filter}
          parentName="skills" />)
    }
  </span>

SkillsFilters.propTypes = {
  filters: PropTypes.array.isRequired
}

const mapState = (state) => ({
  filters: state.data.skills.filters
})

export default connect(mapState)(collapsibleHOC(searchHOC(SkillsFilters)))
