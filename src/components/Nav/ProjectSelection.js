import React, {Component} from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"
import {push} from "connected-react-router"
import {connect} from "react-redux"

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

const AddProject = ({option, handleAddNewProject}) =>
  <StyledAddProject>
    <MenuItem
      onClick={() => handleAddNewProject()}>
      {option.value}
    </MenuItem>
  </StyledAddProject>


AddProject.propTypes = {
  option: PropTypes.object.isRequired,
  handleAddNewProject: PropTypes.func.isRequired
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
    selectedIndex: 1
  }

  handleOpenMenu = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleSelectProject = (option) => {
    this.props.push(`/project/${option.key}/view`)
    this.handleClose()
  }

  handleAddNewProject = () => {
    this.props.push("/create-project")
    this.handleClose()
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl, selectedIndex} = this.state
    return (
      <Wrapper>
        <StyledList>
          <ListItem
            button
            onClick={this.handleOpenMenu}>
            <ListItemText
              primary={options[selectedIndex].value} />
          </ListItem>
        </StyledList>
        <Menu
          id="select-project-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}>
          {options.map((option) => (
            option.key === "add-new-project" ?
              <AddProject
                key={option.key}
                option={option}
                handleAddNewProject={this.handleAddNewProject} /> :
              <SelectProject
                key={option.key}
                option={option}
                handleSelectProject={this.handleSelectProject} />
          ))}
        </Menu>
      </Wrapper>
    )
  }
}

const mapState = (state) => ({
  path: state.router.location.pathname
})

const mapDispatch = {
  push
}

export default connect(mapState, mapDispatch)(SimpleListMenu)
