import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchSkillNetworkData} from "store/modules/actions"
import PropTypes from "prop-types"
import Network from "./Network"
import SideNavigation from "./SideNavigation"
import Loader from "./Loader"

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
      return <div> some text</div>
    }
    componentDidMount() {
      this.fetchData()
    }
    fetchData = () => this.props.dispatch(fetchSkillNetworkData())
    hideSideNavigation = () => this.setState({open: !this.state.open})
    render() {
      if (false) return this.callFunc()
      console.log("somethitn ghere")
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
