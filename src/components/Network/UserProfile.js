import React, { Component } from 'react';
import {connect} from 'react-redux'
import {closeUserProfile} from '../../store/modules/actions'

class UserProfile extends Component {
  closeProfile = () => {
    this.props.dispatch(closeUserProfile())
  }
  render() {
    const {open, name, skills, location, desired_skills} = this.props.profile
    return (
      <div id="user-profile" className={open? "open": ""}>
        <div onClick={this.closeProfile} className="close-button"/>
        <h2 id="name">{name}</h2>
        <h3>Skills</h3>
        <p>{skills}</p>
        <h3>Desired Skills</h3>
        <p>{desired_skills}</p>
        <h3>Contact</h3>
        <p>
          LinkedIn <br/>
          fullname@theuniprogroup.com
        </p>
        <h3>Location</h3>
        <p>{location}</p>
        <h3>About</h3>
        <p>Lorem ipsum dolor sit amet, Perspiciatis iusto voluptates fugit qui accusamus! Tenetur qui obcaecati deserunt, ratione unde eius! Aperiam!</p>
      </div>
    )
  }
}

export default connect(state => ({
  profile: state.data.profile
}))(UserProfile)
