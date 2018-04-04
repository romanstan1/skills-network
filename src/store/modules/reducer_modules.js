
export function cleanPeopleData(peopleData) {
  return peopleData
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(node => ({
      ...node,
      active:true,
      connectionFilterActive: false,
      workingConnections:0
    }
  ))
}

export function getParentState(parentName, state) {
  switch(parentName) {
    case 'people': return state.people
    case 'skills': return state.skills
    case 'connections': return state.connections
    default: throw new Error('error in switch statement for getParentState')
  }
}

export function cleanSkillData(skillData, peopleData) {
  return skillData
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(node => ({
      ...node,
      active:true,
      name: node.id === '1005'? 'Node.js' : node.id === '1068'? 'Firebase': node.name,
      // workingConnections:10,
      hadBy: peopleData.reduce((acc, person,index) => {
        if(person.currentSkills.includes(node.id)) acc.push(peopleData[index].id)
        return acc
      }, []),
      wantedBy: peopleData.reduce((acc, person,index) => {
        if(person.desiredSkills.includes(node.id)) acc.push(peopleData[index].id)
        return acc
      }, [])
    }
  ))
}

export function mapNewFilters(filters, filterName) { // returns array of all nodes in parent ie people or skill or connection
  return filters.map(filter =>
    filter.name === filterName?
    {...filter,
      active: !filter.active // finds the individual filter, and reverses its state.
    }
  : filter)
}

export function noOfOccurences(personNode, skillFilters) {
  let workingConnections = 0
  personNode.currentSkills.forEach(skillId => {
    if(skillFilters.includes(skillId)) workingConnections++
  })
  return workingConnections
}

export function mapNewFiltersSubGroup(filters, subGroup) {
  const subGroupFilters = filters.filter(filter => filter.location === subGroup || filter.client === subGroup)
  const subGroupFiltersAllOpen = subGroupFilters.map(filter => filter.active).includes(false)
  return filters.map(filter =>
    filter.location === subGroup || filter.client === subGroup?
    {...filter,
      active: subGroupFiltersAllOpen // Are ALL of the filters within a subgroup selected? Boolean
    }
  : filter)
}
