import React, {Component} from "react"
import PropTypes from "prop-types"
// import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import {List, ListItem, ListItemText, MenuItem, Menu} from "@material-ui/core"
import {push} from "connected-react-router"
import {connect} from "react-redux"

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

  handleMenuItemClick = (value) => {
    this.props.push(`/project/${value}/view`)
    this.handleClose()
    console.log("this: ", this)
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
              onClick={() => this.handleMenuItemClick(option)}>
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
