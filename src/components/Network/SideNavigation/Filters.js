import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';




class CollapsibleParent extends Component {
  state = {
    open: true
  }
  onOpen = () => {
    this.setState({open: !this.state.open})
  }
  render () {
    const {handleSelectAllClick, parent, trigger, children} = this.props
    const {open} = this.state
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


const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>


          <CollapsibleParent
            parent={parent}
            handleSelectAllClick={handleSelectAllClick}
            trigger={humanize(parent.parentName)}>
          <div className='parent-name'>
            {/* <h3>{humanize(parent.parentName)}</h3> */}
            {/* <div
              onClick={()=>handleSelectAllClick(parent.parentName)}
              className={parent.active?'active':null}>
              <span></span>
            </div> */}
          </div>
            {
              parent.filters.map(filter =>
                <div
                  key={filter.name}
                  className={filter.active ? 'single-filter active':'single-filter'}
                  onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
                  <h4>{humanize(filter.name)}</h4>
                  <span></span>
                </div>
              )
            }
          </CollapsibleParent>



      </span>
    ))
  }
</section>

export default Filters
