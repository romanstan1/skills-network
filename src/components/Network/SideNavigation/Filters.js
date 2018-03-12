import React, { Component } from 'react';
import humanize from 'string-humanize'
import Collapsible from 'react-collapsible';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


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

class SliderWrap extends Component {
  state = {
    value: 1
  }
  handleChange = (value) => {
    this.setState({value})
  }
  render () {
    return (
      <div className='slider-wrap'>

        <h4> Minimum</h4>

        <Slider
          step={1}
          marks={{0: '0',1: '1',2: '2',3: '3',4: '4'}}
          min={0}
          max={4}
        />
      </div>
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
          {/* <SliderWrap/> */}
        </CollapsibleParent>
      </span>
    ))
  }
</section>

export default Filters
