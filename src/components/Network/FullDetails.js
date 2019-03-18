import React, {Component} from "react"
import {connect} from "react-redux"
import {toggleFullDetails} from "store/actions/visualise"
import PropTypes from "prop-types"

class FullDetails extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fullDetails: PropTypes.object.isRequired
  }
  hideFullDetails = () => {
    this.props.dispatch(toggleFullDetails())
  }
  className = () => {
    const {open, hidden} = this.props.fullDetails
    if (!open) return ""
    if (hidden) return "open hidden"
    return "open"
  }
  render() {
    const {fullDetails} = this.props
    const {name, type} = fullDetails
    return (
      <div
        id="full-details"
        className={this.className()}>
        <div onClick={this.hideFullDetails} className="hide-details-tab">
          <div className="chevron" />
        </div>
        <div className="details-inner">
          <h2 id="name">{name}</h2>
          {type === "person" ? <UserProfile fullDetails={fullDetails} /> : null }
          {type === "skill" ? <SkillDetails fullDetails={fullDetails} /> : null }
        </div>
      </div>
    )
  }
}

const UserProfile = ({fullDetails}) =>
  <div>
    <h3>Skills</h3>
    <p>{fullDetails.currentSkills}</p>
    <h3>Desired Skills</h3>
    <p>{fullDetails.desiredSkills}</p>
    <h3>Contact</h3>
    <p>
      {fullDetails.email} <br />
      {fullDetails.linkedin}
    </p>
    <h3>Location</h3>
    <p>{fullDetails.location}</p>
    <h3>Client</h3>
    <p>{fullDetails.client}</p>
    <h3>Start Date</h3>
    <p>{fullDetails.startDate}</p>
    <h3>About</h3>
    <p>{fullDetails.about}</p>
  </div>

UserProfile.propTypes = {
  fullDetails: PropTypes.object.isRequired
}

const SkillDetails = ({fullDetails}) =>
  <div>
    <h3>People</h3>
    <p>{fullDetails.hadBy}</p>
    <h3>Desired By</h3>
    <p>{fullDetails.wantedBy}</p>
    <h3>Description</h3>
    <p>Lorem ipsum dolor sit amet, iusto voluptates fugit qui accusamus! enetur qui obcaecati deserunt. </p>
  </div>

SkillDetails.propTypes = {
  fullDetails: PropTypes.object.isRequired
}

export default connect((state) => ({
  fullDetails: state.data.fullDetails
}))(FullDetails)
