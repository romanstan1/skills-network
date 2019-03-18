import React, {Component} from "react"
// import PropTypes from "prop-types"
// import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"

const options = [
  "Project 1",
  "Project 2",
  "Project 3"
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
  }

  state = {
    anchorEl: null,
    selectedIndex: 1
  }

  handleClickListItem = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuItemClick = (event, index) => {
    this.setState({selectedIndex: index, anchorEl: null})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    return (
      <Wrapper>
        <StyledList>
          <ListItem
            button
            onClick={this.handleClickListItem}>
            <ListItemText
              primary={options[this.state.selectedIndex]} />
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
              disabled={i === 0}
              selected={i === this.state.selectedIndex}
              onClick={(event) => this.handleMenuItemClick(event, i)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    )
  }
}


export default SimpleListMenu
