import React, { Component } from 'react';
import {connect} from 'react-redux'
import {toggleFullDetails} from 'store/modules/actions'

class FullDetails extends Component {
  hideFullDetails = () => {
    this.props.dispatch(toggleFullDetails())
  }
  render() {
    const {fullDetails} = this.props
    const {open, name, type, hidden} = fullDetails
    return (
      <div id="full-details"
        className={open? hidden? "open hidden" : "open": ""}>
        <div onClick={this.hideFullDetails} className='hide-details-tab'>
          {/* <div className="close-button"/> */}
          <div className='chevron'/>
        </div>
        <div className='details-inner'>
          <h2 id="name">{name}</h2>
          {type === 'person'? <UserProfile fullDetails={fullDetails}/> : null }
          {type === 'skill'? <SkillDetails fullDetails={fullDetails}/> : null }
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
      LinkedIn <br/>
      fullname@theuniprogroup.com
    </p>
    <h3>Location</h3>
    <p>{fullDetails.location}</p>
    <h3>About</h3>
    <p>Lorem ipsum dolor sit amet, Perspiciatis iusto voluptates fugit qui accusamus! Tenetur qui obcaecati deserunt, ratione unde eius! Aperiam!</p>
  </div>

const SkillDetails = ({fullDetails}) =>
  <div>
    <h3>People</h3>
    <p>{fullDetails.peopleCurrent}</p>
    <h3>Desired By</h3>
    <p>{fullDetails.peopleDesired}</p>
  </div>


export default connect(state => ({
  fullDetails: state.data.fullDetails
}))(FullDetails)
