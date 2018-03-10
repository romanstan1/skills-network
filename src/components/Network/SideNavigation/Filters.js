import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';




class CollapsibleParent extends Component {
  state = {
    open: true
  }
  onOpen = () => {
    this.setState({open: !this.state.open})
    console.log("onOpen")
  }
  render () {
    const {open} = this.state
    return (
      <Collapsible
        // open={open}
        onOpen={this.onOpen}
        // triggerSibling={ () =>
        //   <div className='titleCollapse'> CLICK </div>
        // }
        transitionTime={100} trigger=" click to trigter ">

        Collapse <br/>
        content

      </Collapsible>
    )
  }
}


const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>

        {/* <CollapsibleParent/> */}

        <div className='parent-name'>
          <h3>{humanize(parent.parentName)}</h3>
          <div
            onClick={()=>handleSelectAllClick(parent.parentName)}
            className={parent.active?'active':null}>
            <span></span>
          </div>
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
      </span>
    ))
  }
</section>

export default Filters
