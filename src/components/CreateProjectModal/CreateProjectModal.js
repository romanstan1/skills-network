import React, {Component} from "react"
import {Dialog} from "@material-ui/core"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {CtaButton, Input} from "ui"
import {addAProject} from "firebase/modules"

class CreateProjectModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
  }

  state = {
    name: ""
  }

  handleAddNewProject = () => {
    const {onClose, user} = this.props
    const {name} = this.state
    const projectKey = name.toLowerCase().replace(/\s/g, "-")
    addAProject(user, projectKey, name)
    onClose()
  }

  handleChange = (e) => this.setState({[e.target.dataset.type]: e.target.value})

  render() {
    const {open, onClose} = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="create-project-modal">
        <Input
          label="Project name"
          dataType="name"
          type="text"
          onChange={this.handleChange} />
        <CtaButton
          onClick={this.handleAddNewProject}
          text="Create Project" />
      </Dialog>
    )
  }
}


const mapState = (state) => ({
  user: state.auth.user
})

// const mapDispatch = {
//   push
// }

export default connect(mapState)(CreateProjectModal)
