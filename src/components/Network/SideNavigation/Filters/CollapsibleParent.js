import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

export default class CollapsibleParent extends Component {
  // state = {
  //   open: true
  // }
  // onOpen = () => {
  //   this.setState({open: !this.state.open})
  // }
  render () {
    const {handleSelectAllClick, parent, trigger, children} = this.props
    // const {open} = this.state
    return (
      <Collapsible
        // onOpen={this.onOpen}
        triggerSibling={() =>
          <div
            onClick={()=>handleSelectAllClick(parent.parentName)}
            className={parent.active?'select-all active':'select-all'}>
            <span></span>
          </div>
        }
        transitionTime={100} trigger={trigger}>
        {children}
      </Collapsible>
    )
  }
}
