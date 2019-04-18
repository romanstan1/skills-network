import React, {Component} from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"
import {push} from "connected-react-router"
import {connect} from "react-redux"
import CreateProjectModal from "components/CreateProjectModal"

const options = [
  {
    key: "add-new-project",
    value: " Add a project"
  },
  {
    key: "first-project",
    value: "First Project"
  },
  {
    key: "random-project",
    value: "Random Project"
  },
  {
    key: "another-project",
    value: "Another Project"
  }
]

const StyledList = styled(List)`
  padding: 0px !important;
`


const Wrapper = styled.div`
  background: #ddd;
  grid-column: 2 / 3;
`

const StyledAddProject = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid grey; 
  margin-bottom: 5px;
`

const AddProject = ({option, openProjectModal}) =>
  <StyledAddProject>
    <MenuItem
      onClick={() => openProjectModal()}>
      {option.value}
    </MenuItem>
  </StyledAddProject>


AddProject.propTypes = {
  option: PropTypes.object.isRequired,
  openProjectModal: PropTypes.func.isRequired
}

const SelectProject = ({option, handleSelectProject}) =>
  <MenuItem
    // selected={i === selectedIndex}
    onClick={() => handleSelectProject(option)}>
    {option.value}
  </MenuItem>

SelectProject.propTypes = {
  option: PropTypes.object.isRequired,
  handleSelectProject: PropTypes.func.isRequired
}

class SimpleListMenu extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  }

  state = {
    anchorEl: null,
    selectedIndex: 1,
    addProjectOpen: false
  }

  handleOpenDropdown = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleCloseDropdown = () => {
    this.setState({anchorEl: null})
  }

  closeProjectModal = () => {
    this.setState({addProjectOpen: false})
  }

  openProjectModal = () => {
    this.handleCloseDropdown()
    this.setState({addProjectOpen: true})
  }

  handleSelectProject = (option) => {
    this.handleClose()
    this.props.push(`/project/${option.key}/view`)
  }

  render() {
    const {anchorEl, selectedIndex, addProjectOpen} = this.state
    return (
      <Wrapper>
        <StyledList>
          <ListItem
            button
            onClick={this.handleOpenDropdown}>
            <ListItemText
              primary={options[selectedIndex].value} />
          </ListItem>
        </StyledList>
        <Menu
          id="select-project-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleCloseDropdown}>
          {options.map((option) => (
            option.key === "add-new-project" ?
              <AddProject
                key={option.key}
                option={option}
                openProjectModal={this.openProjectModal} /> :
              <SelectProject
                key={option.key}
                option={option}
                handleSelectProject={this.handleSelectProject} />
          ))}
        </Menu>
        <CreateProjectModal
          open={addProjectOpen}
          onClose={this.closeProjectModal} />
      </Wrapper>
    )
  }
}

const mapState = (state) => ({
  path: state.router.location.pathname,
  user: state.auth.user
})

const mapDispatch = {
  push
}

export default connect(mapState, mapDispatch)(SimpleListMenu)
