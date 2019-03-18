import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchSkillNetworkData} from "store/actions/visualise"
import PropTypes from "prop-types"
import Network from "components/Network"
import Loader from "components/Loader"
import SideNavigation from "./SideNavigation"

class Home extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    failedData: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  state = {
    open: false
  }
  callFunc = () => {
    return null
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => this.props.dispatch(fetchSkillNetworkData())
  hideSideNavigation = () => this.setState({open: !this.state.open})
  render() {
    if (true) return this.callFunc()
    const {people, skills, failedData} = this.props
    const {open} = this.state
    return (
      <div id="Home">
        <SideNavigation
          open={open}
          hideSideNavigation={this.hideSideNavigation} />
        {!people.length && !skills.length ?
          <Loader
            failedData={failedData}
            fetchData={this.fetchData} /> :
          <Network
            sideNavOpen={open} />
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

export default connect(mapState)(Home)
