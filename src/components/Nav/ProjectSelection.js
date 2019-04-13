import React, {Component} from "react"
import PropTypes from "prop-types"
// import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"
import {push} from "react-router-redux"
import {connect} from "react-redux"
import {history} from "App"

const options = [
  "first-project",
  "random-project",
  "another-project"
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

  handleClickListItem = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuItemClick = (event, index, value) => {
    // this.props.history.push(`/project/${index}/view`)
    history.push(`/project/${value}/view`)
    // this.props.push("/projects/2/view")
    this.setState({selectedIndex: index, anchorEl: null})
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
            onClick={this.handleClickListItem}>
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
              onClick={(event) =>
                this.handleMenuItemClick(event, i, options[selectedIndex])}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    )
  }
}

const mapDispatch = {
  push
}

export default connect(null, mapDispatch)(SimpleListMenu)
