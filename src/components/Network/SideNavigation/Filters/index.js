import React from 'react'
import PeopleFilters from './PeopleFilters'
import SkillsFilters from './SkillsFilters'
import ConnectionFilters from './ConnectionFilters'
// import Collapsible from 'react-collapsible'
// import {toggleFilter, toggleSelectAllFilter} from '../../../../store/modules/actions'
import {connect} from 'react-redux'


// class Filters extends Component {
//
//   handleFilterClick = (filterName, parentName) => {
//     console.log("filterName, parentName",filterName, parentName)
//     // this.props.dispatch(toggleFilter(filterName, parentName))
//     // applyFilter()
//   }



const Filters = ({connections, people, skills}) =>
  <section className='filters'>
    <ConnectionFilters active={connections.active} parentName='connections'/>
    <PeopleFilters active={people.active} parentName='people'/>
    <SkillsFilters active={skills.active} parentName='skills'/>
  </section>



//         {/*
//         <Collapsible
//           triggerSibling={() =>
//             <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
//               parentName='connections' parentActive={connections.active}/>
//             }
//           transitionTime={100} trigger='Connections'>
//           <ConnectionFilters handleFilterClick={this.handleFilterClick} connections={connections}/>
//         </Collapsible> */}
//
//         {/* <Collapsible
//           triggerSibling={() =>
//             <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
//               parentName='people' parentActive={people.active}/>
//             }
//           transitionTime={100} trigger='People'>
//            <PeopleFilters />
//         </Collapsible>
//
//         <Collapsible
//           triggerSibling={() =>
//             <TriggerSibling handleSelectAllClick={this.handleSelectAllClick}
//               parentName='skills' parentActive={skills.active}/>
//             }
//           transitionTime={100} trigger='Skills'>
//            <SkillsFilters handleFilterClick={this.handleFilterClick} skillsFilters={skills.filters}/>
//         </Collapsible> */}
//
//       {/* <Enhanced/> */}
//
//       {/* </section>
//     )
//   }
// } */}


export default connect(state => ({
  people: state.data.people,
  skills: state.data.skills,
  connections: state.data.connections
}))(Filters)
