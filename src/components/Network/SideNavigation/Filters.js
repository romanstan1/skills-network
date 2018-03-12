import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import SliderWrap from './SliderWrap'

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

const Connections = ({parent, handleFilterClick}) => <span>
  <div
    className={parent.filters[0].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[0].name, parent.parentName)} >
    <h4>{humanize('current_skills')}</h4>
    <span></span>
  </div>
  <SliderWrap/>
  <div
    className={parent.filters[1].active ? 'single-filter active':'single-filter'}
    onClick={()=>handleFilterClick(parent.filters[1].name, parent.parentName)} >
    <h4>{humanize('desired_skills')}</h4>
    <span></span>
  </div>
</span>

const Filters = ({allFilters, handleFilterClick, handleSelectAllClick}) =>
<section className='filters'>
  {
    allFilters.map((parent =>
      <span key={parent.parentName}>

        <CollapsibleParent
          parent={parent}
          handleSelectAllClick={handleSelectAllClick}
          trigger={humanize(parent.parentName)}>
          {
            parent.parentName !== 'connections'?
            parent.filters.map(filter =>
              <div
                key={filter.name}
                className={filter.active ? 'single-filter active':'single-filter'}
                onClick={()=>handleFilterClick(filter.name, parent.parentName)} >
                <h4>{humanize(filter.name)}</h4>
                <span></span>
              </div>
            ) :
            <Connections handleFilterClick={handleFilterClick} parent={parent}/>
          }

        </CollapsibleParent>
      </span>
    ))
  }
</section>

export default Filters
