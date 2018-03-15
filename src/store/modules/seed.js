const seedData = {
  people: [
    {"id": "001", type:"person", "name": "David Buckshaw", "location": "London", "currentSkills":['11', '13', '14', '20'], "desiredSkills":['12'], "client": 'Specsavers' },
    {"id": "002", type:"person", "name": "Sebastian Hoolson", "location": "Chichester", "currentSkills":['11', '15', '16'], "desiredSkills":['19'], "client": 'Specsavers' },
    {"id": "003", type:"person", "name": "Miles Preston", "location": "London", "currentSkills":['12', '13', '14'], "desiredSkills":['15', '17'], "client": 'Specsavers' },
    {"id": "004", type:"person", "name": "Edward Magloire", "location": "Mauritius", "currentSkills":['12', '13', '15'], "desiredSkills":['14', '13'], "client": 'Pfizer' },
    {"id": "005", type:"person", "name": "Frank Countessdelo", "location": "Chichester", "currentSkills":['12', '13', '17'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "006", type:"person", "name": "Evan Geborand", "location": "London", "currentSkills":['16', '17', '18'], "desiredSkills":['14', '19'], "client": 'Pfizer'},
    {"id": "007", type:"person", "name": "Roberto Champtercier", "location": "Sydney", "currentSkills":['16', '17', '18'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "008", type:"person", "name": "Dylan Cravatte", "location": "Sydney", "currentSkills":['14', '17', '18'], "desiredSkills":['11', '12'], "client": 'Pfizer' },
    {"id": "009", type:"person", "name": "Jeremy Maguello", "location": "London", "currentSkills":['15', '16', '17', '18', '19'], "desiredSkills":['12', '18'], "client": 'Specsavers' },
    {"id": "010", type:"person", "name": "Sydney Hitchcock", "location": "London", "currentSkills":['15', '16', '11', '18'], "desiredSkills":['12', '18', '17'], "client": 'Specsavers' },
    {"id": "011", type:"person", "name": "William Stevenson", "location": "London", "currentSkills":['12', '16', '13', '18'], "desiredSkills":['14'], "client": 'Ladbrokes' },
    {"id": "012", type:"person", "name": "James Wiltshire", "location": "London", "currentSkills":['14', '15', '13', '18'], "desiredSkills":['17', '20'], "client": 'N/A' },
    {"id": "013", type:"person", "name": "Nickolas Wilson", "location": "Chichester", "currentSkills":['11', '12', '17', '18'], "desiredSkills":['19', '20'], "client": 'Pfizer' },
    {"id": "014", type:"person", "name": "Timothy Tresuguet", "location": "Chichester", "currentSkills":['11', '18'], "desiredSkills":['17', '16', '13'], "client": 'N/A' },
    {"id": "015", type:"person", "name": "Richard Grayson", "location": "Chichester", "currentSkills":['13','14', '18'], "desiredSkills":['17', '19', '12'], "client": 'Specsavers' },
    {"id": "016", type:"person", "name": "Neil Young", "location": "London", "currentSkills":['11','12', '16'], "desiredSkills":['13'], "client": 'Ladbrokes' },
    {"id": "017", type:"person", "name": "Elvis Iglesias", "location": "Chichester", "currentSkills":['14','11', '20'], "desiredSkills":['13'], "client": 'N/A' },
    {"id": "018", type:"person", "name": "Jimmy Black", "location": "London", "currentSkills":['15', '19'], "desiredSkills":['14'], "client": 'N/A' }
  ]
  ,
  skills: [
    {"id": "11",  type:"skill", "name": "Python"},
    {"id": "12",  type:"skill", "name": "AngularJS" },
    {"id": "13",  type:"skill", "name": "Angular2" },
    {"id": "14",  type:"skill", "name": "React" },
    {"id": "15",  type:"skill", "name": "Drupal 7" },
    {"id": "16",  type:"skill", "name": "Pottery" },
    {"id": "17",  type:"skill", "name": "Line Dancing" },
    {"id": "18",  type:"skill", "name": "UX Design" },
    {"id": "19",  type:"skill", "name": "Rugby" },
    {"id": "20",  type:"skill", "name": "Digital Marketing" }
  ]
}

export const peopleData = seedData.people.map(node => {
  return {
    ...node,
    active:true,
    connectionFilterActive: false,
    workingConnections:0
  }
})

export const skillsData = seedData.skills.map(node => {
  return {
    ...node,
    active:true,
    workingConnections:10,
    hadBy: peopleData.reduce((acc, person,index) => {
      if(person.currentSkills.includes(node.id)) acc.push(peopleData[index].id)
      return acc
    }, []),
    wantedBy: peopleData.reduce((acc, person,index) => {
      if(person.desiredSkills.includes(node.id)) acc.push(peopleData[index].id)
      return acc
    }, [])
  }
})
