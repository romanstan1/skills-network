import React, { Component } from 'react';
import './style.css'
import Filters from './Filters'
import {connect} from 'react-redux'
import {updateScreenDimensions} from 'store/modules/actions'

const Nav = ({selectedNav, handleSelectNav}) =>
<nav>
  <span
    className={selectedNav === "Filter"? "selected": null}
    onClick={handleSelectNav}>Filter
  </span>
  <span
    className={selectedNav === "Edit Profile"? "selected": null}
    onClick={handleSelectNav}>Edit Profile
  </span>
</nav>

const EditUserProfile = () =>
<section>
  <br/>
  <p>[ Edit profile here ]</p>
</section>

class SideNavigation extends Component {
  state = {
    selectedNav: 'Filter'
  }
  handleSelectNav = (e) => {
    e.stopPropagation()
    this.setState({selectedNav: e.target.innerHTML})
  }

  componentWillReceiveProps(nextProps) {
    this.updateScreenDimensions()
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateScreenDimensions)
  }

  updateScreenDimensions = () => {
    this.props.dispatch(updateScreenDimensions())
  }

  render() {
    const {selectedNav} = this.state
    const {open,hideSideNavigation, width} = this.props
    return [
      <div key='sidenavigation' className={window.visualViewport.width > 600? 'side-navigation open': open? 'side-navigation': 'side-navigation open'}>
        <div className='openNavTab' onClick={window.visualViewport.width > 600? null : hideSideNavigation }>
          <div className='chevron'/>
        </div>
        <div className='side-navigation-inner'>
          { selectedNav === "Filter"? <Filters/> : <EditUserProfile/> }
        </div>
      </div>
    ]
  }
}

export default connect(state => ({
  width: state.data.width
}))(SideNavigation)
