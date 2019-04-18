import React, {Component} from "react"
import PropTypes from "prop-types"
// import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"
import {push} from "connected-react-router"
import {connect} from "react-redux"

const options = [
  {
    key: "add-new-project",
    value: "Add new project"
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

  handleSelectProject = (value) => {
    this.props.push(`/project/${value}/view`)
    this.handleClose()
  }

  handleAddNewProject = () => {
    this.props.push("/create-project")
    this.handleClose()
  }

  handleSelectItem = (option) => {
    if (option.key === "add-new-project") this.handleAddNewProject()
    else this.handleSelectProject(option)
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
              primary={options[selectedIndex]} />
          </ListItem>
        </StyledList>
        <Menu
          // id="lock-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}>
          {options.map((option, i) => (
            <MenuItem
              key={option}
              // disabled={i === 0}
              selected={i === selectedIndex}
              onClick={() => this.handleSelectItem(option)}>
              {option}
            </MenuItem>
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
