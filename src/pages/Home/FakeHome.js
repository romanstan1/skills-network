import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {firestore} from "firebase/initialize"

class FakeHome extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  getUserData = () => {
    const {user} = this.props
    const docRef = firestore.collection("users").doc(user.uid)
    // const docRef = firestore.collection("users").doc(user.uid)
    console.log("dob: tz4jFziMTKZqDojsWoeQJR8rJzl2")
    console.log("user: ", user.uid)

    docRef.get().then((userData) => {
      console.log("userData: ", userData.data())
    }).catch((error) => {
      console.log("error: ", error)
    })
  }

  render() {
    return (
      <div>
        <div onClick={this.getUserData}>
          get user data
        </div>

        Fake home
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.auth.user
})

export default connect(mapState)(FakeHome)
