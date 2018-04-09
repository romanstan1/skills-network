

export default function constructLinks(people, skills, connections){

  const currentSkills = connections.filters.filter(connection =>
    connection.name === 'currentSkills' && connection.active).length
  const desiredSkills = connections.filters.filter(connection =>
    connection.name === 'desiredSkills' && connection.active).length

  let linksArray = []

  people.forEach((person, ind) => {

    // Check whether current skills filter is active
    if(currentSkills) {
      person.currentSkills.forEach((skillId, i) => {
        // Check whether the skill node is active
        if(skills.find(skill => skill.id === skillId)) {
          linksArray.push({"source": person.id, "target": skillId, "type": "currentSkills"})
        }
      })
    }

    // Check whether desired skills filter is active
    if(desiredSkills) {
      person.desiredSkills.forEach((skillId, i) => {
        // Check whether the skill node is active
        if(skills.find(skill => skill.id === skillId)) {
          linksArray.push({"source": person.id, "target": skillId, "type": "desiredSkills"})
        }
      })
    }

  })

  return linksArray
  // skills.filter(skillNode => skillNode.id === skill)[0].peopleCurrent.push(person.name)
  // skills.filter(skillNode => skillNode.id === skill)[0].peopleDesired.push(person.name)
}
