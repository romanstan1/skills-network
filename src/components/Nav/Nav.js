import React, {Component} from "react"
import styled, {css} from "styled-components"
import PropTypes from "prop-types"
import {connect} from "react-redux"

class Nav extends Component {
    static propTypes = {
    }
    console.log("something: ", something)
    render() {
      return (
        <div />
      )
    }
}

const mapState = () => ({})

export default connect(mapState)(Nav)
