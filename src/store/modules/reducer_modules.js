
export function cleanPeopleData(peopleData) {
  return peopleData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((node) => ({
      ...node,
      active: true,
      connectionFilterActive: false,
      workingConnections: 0
    }))
}

export function windowDimensions() {
  let width
  let height

  if (window.visualViewport) {
    width = window.visualViewport.width > 600 ?
      window.visualViewport.width - 260 : window.visualViewport.width - 35
    height = window.visualViewport.height
  } else {
    width = window.innerWidth
    height = window.innerHeight
  }
  return {width, height}
}

export function lookUp(id, filters) {
  const filter = filters.find((item) => item.id === id)
  if (filter) return filter.name
  else return ""
}

export function getParentState(parentName, state) {
  switch (parentName) {
    case "people": return state.people
    case "skills": return state.skills
    case "connections": return state.connections
    default: throw new Error("error in switch statement for getParentState")
  }
}

export function cleanSkillData(skillData, peopleData) {
  function nameEdgeCases(node) {
    if (node.id === "1005") return "Node.js"
    else if (node.id === "1068") return "Firebase"
    else return node.name
  }

  return skillData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((node) => ({
      ...node,
      active: true,
      name: nameEdgeCases(node),
      hadBy: peopleData.reduce((acc, person, i) => {
        if (person.currentSkills.includes(node.id)) acc.push(peopleData[i].id)
        return acc
      }, []),
      wantedBy: peopleData.reduce((acc, person, i) => {
        if (person.desiredSkills.includes(node.id)) acc.push(peopleData[i].id)
        return acc
      }, [])
    }
    ))
}

export function mapNewFilters(filters, filterName) {
  // returns array of all nodes in parent ie people or skill or connection
  return filters.map((filter) =>
    (filter.name === filterName ?
      {...filter,
        active: !filter.active // finds the individual filter, and reverses its state.
      }
      : filter))
}

export function noOfOccurences(personNode, skillFilters) {
  let workingConnections = 0
  personNode.currentSkills.forEach((skillId) => {
    if (skillFilters.includes(skillId)) workingConnections++
  })
  return workingConnections
}

export function mapNewFiltersSubGroup(filters, subGroup) {
  const subGroupFilters = filters.filter((filter) => filter.location === subGroup || filter.client === subGroup)
  const subGroupFiltersAllOpen = subGroupFilters.map((filter) => filter.active).includes(false)
  return filters.map((filter) =>
    (filter.location === subGroup || filter.client === subGroup ?
      {...filter,
        active: subGroupFiltersAllOpen // Are ALL of the filters within a subgroup selected? Boolean
      }
      : filter))
}

export function constructForceNetwork({people, skills, connections}) {
  // console.log('skills first', skills.filters)
  // TODO: remove mesh ids from nodes that are no longer active

  const newPeople = people.filters.filter((person) => person.active && !person.connectionFilterActive) // the new active people
  const newSkills = skills.filters.filter((skill) => skill.active) // the new active skills

  // console.log('skills second', skills)

  const links = constructLinks(newPeople, newSkills, connections)
  const nodes = [].concat(newPeople, newSkills)

  return {
    nodes,
    links
  }
}

function constructLinks(people, skills, connections) {
  const currentSkills = connections.filters.filter((connection) =>
    connection.name === "currentSkills" && connection.active).length
  const desiredSkills = connections.filters.filter((connection) =>
    connection.name === "desiredSkills" && connection.active).length

  const linksArray = []

  people.forEach((person) => {
    // Check whether current skills filter is active
    if (currentSkills) {
      person.currentSkills.forEach((skillId) => {
        // Check whether the skill node is active
        if (skills.find((skill) => skill.id === skillId)) {
          linksArray.push({source: person.id, target: skillId, type: "currentSkills"})
        }
      })
    }

    // Check whether desired skills filter is active
    if (desiredSkills) {
      person.desiredSkills.forEach((skillId) => {
        // Check whether the skill node is active
        if (skills.find((skill) => skill.id === skillId)) {
          linksArray.push({source: person.id, target: skillId, type: "desiredSkills"})
        }
      })
    }
  })
  return linksArray
}
