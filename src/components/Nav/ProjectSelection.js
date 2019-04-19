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

const AddProject = ({openProjectModal}) =>
  <StyledAddProject>
    <MenuItem
      onClick={() => openProjectModal()}>
      Add a project
    </MenuItem>
  </StyledAddProject>


AddProject.propTypes = {
  openProjectModal: PropTypes.func.isRequired
}

const SelectProject = ({option, handleSelectProject}) =>
  <MenuItem
    // selected={i === selectedIndex}
    onClick={() => handleSelectProject(option)}>
    {option.name}
  </MenuItem>

SelectProject.propTypes = {
  option: PropTypes.object.isRequired,
  handleSelectProject: PropTypes.func.isRequired
}

class SimpleListMenu extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
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
    this.handleCloseDropdown()
    this.props.push(`/project/${option.key}/view`)
  }

  render() {
    const {projects} = this.props
    const {anchorEl, selectedIndex, addProjectOpen} = this.state
    console.log("projects:", projects)
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
          <AddProject
            key="add-project-key"
            openProjectModal={this.openProjectModal} />
          {
            projects.map((project) => (
              <SelectProject
                key={project.key}
                option={project}
                handleSelectProject={this.handleSelectProject} />
            ))
          }
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
  projects: state.auth.projects
})

const mapDispatch = {
  push
}

export default connect(mapState, mapDispatch)(SimpleListMenu)
