import React, { Component } from 'react';
import {connect} from 'react-redux'
import {closeProfile} from '../../store/modules/actions'





class Profile extends Component {
  closeProfile = () => {
    this.props.dispatch(closeProfile())
  }
  render() {
    const {profile} = this.props
    const {open, name, type} = profile
    console.log("profile",profile)
    return (
      <div id="profile" className={open? "open": ""}>
        <div onClick={this.closeProfile} className="close-button"/>
        <h2 id="name">{name}</h2>
        {type === 'person'? <UserDetails profile={profile}/> : null }
        {type === 'skill'? <SkillDetails profile={profile}/> : null }
      </div>
    )
  }
}

const UserDetails = ({profile}) =>
  <div>
    <h3>Skills</h3>
    <p>{profile.skills}</p>
    <h3>Desired Skills</h3>
    <p>{profile.desired_skills}</p>
    <h3>Contact</h3>
    <p>
      LinkedIn <br/>
      fullname@theuniprogroup.com
    </p>
    <h3>Location</h3>
    <p>{profile.location}</p>
    <h3>About</h3>
    <p>Lorem ipsum dolor sit amet, Perspiciatis iusto voluptates fugit qui accusamus! Tenetur qui obcaecati deserunt, ratione unde eius! Aperiam!</p>
  </div>

const SkillDetails = ({profile}) =>
  <div>
    <h3>People</h3>
    <p>{profile.people_current}</p>
    <h3>Desired By</h3>
    <p>{profile.people_desired}</p>
  </div>






export default connect(state => ({
  profile: state.data.profile
}))(Profile)
