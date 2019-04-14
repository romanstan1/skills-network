import React, {Component} from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import uniqueId from "helpers/uniqueId"

const Wrapper = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  label: {
  }
  input {
    line-height: 30px;
    height: 30px;
    outline: none;
    text-indent: 5px;
    &:focus {
      border: 2px solid black;
    }
  }
`

class Input extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.id = uniqueId()
  }
  render() {
    const {onChange, dataType, label, type} = this.props

    return (
      <Wrapper>
        <label htmlFor={this.id}>{label}</label>
        <input id={this.id} data-type={dataType} type={type} onChange={onChange} />
      </Wrapper>
    )
  }
}

export default Input
