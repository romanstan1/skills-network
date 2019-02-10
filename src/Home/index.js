import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchSkillNetworkData} from "store/modules/actions"
import PropTypes from "prop-types"
import Network from "./Network"
import SideNavigation from "./SideNavigation"
import Loader from "./Loader"

class Main extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    failedData: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.fetchData()
  }
  state = {
    open: false
  }
  fetchData = () => {
    this.props.dispatch(fetchSkillNetworkData())
  }
  hideSideNavigation = () => {
    this.setState({open: !this.state.open})
  }
  render() {
    const {people, skills, failedData} = this.props
    return (
      <div id="main">
        <SideNavigation
          open={this.state.open}
          hideSideNavigation={this.hideSideNavigation} />
        {!people.length && !skills.length ?
          <Loader
            failedData={failedData}
            fetchData={this.fetchData} /> :
          <Network
            sideNavOpen={this.state.open} />
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  people: state.data.people.filters,
  skills: state.data.skills.filters,
  failedData: state.data.failedData
})

export default connect(mapState)(Main)
