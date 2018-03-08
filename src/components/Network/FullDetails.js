import React, { Component } from 'react';
import {connect} from 'react-redux'
import {closeFullDetails} from '../../store/modules/actions'

class FullDetails extends Component {
  closeFullDetails = () => {
    this.props.dispatch(closeFullDetails())
  }
  render() {
    const {fullDetails} = this.props
    const {open, name, type} = fullDetails
    return (
      <div id="profile" className={open? "open": ""}>
        <div onClick={this.closeFullDetails} className='closeProfileTab'>
          <div className="close-button"/>
        </div>
        <div className='profileInner'>
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
    <p>{fullDetails.skills}</p>
    <h3>Desired Skills</h3>
    <p>{fullDetails.desired_skills}</p>
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
    <p>{fullDetails.people_current}</p>
    <h3>Desired By</h3>
    <p>{fullDetails.people_desired}</p>
  </div>






export default connect(state => ({
  fullDetails: state.data.fullDetails
}))(FullDetails)
