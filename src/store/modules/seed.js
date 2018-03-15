const seedData = {
  people: [
    {"id": "001", type:"person", "name": "David Buckshaw", "location": "London", "currentSkills":['26','11', '13', '14', '20'], "desiredSkills":['12'], "client": 'Specsavers' },
    {"id": "002", type:"person", "name": "Sebastian Hoolson", "location": "Chichester", "currentSkills":['25','11', '15', '16'], "desiredSkills":['19'], "client": 'Specsavers' },
    {"id": "003", type:"person", "name": "Miles Preston", "location": "London", "currentSkills":['12', '13', '14'], "desiredSkills":['15', '17'], "client": 'Specsavers' },
    {"id": "004", type:"person", "name": "Edward Magloire", "location": "Mauritius", "currentSkills":['25','12', '13', '15'], "desiredSkills":['14', '13'], "client": 'Pfizer' },
    {"id": "005", type:"person", "name": "Frank Countessdelo", "location": "Chichester", "currentSkills":['12', '13', '17'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "006", type:"person", "name": "Evan Geborand", "location": "London", "currentSkills":['25','16', '17', '18'], "desiredSkills":['19','14', '19'], "client": 'Pfizer'},
    {"id": "007", type:"person", "name": "Roberto Champtercier", "location": "Sydney", "currentSkills":['16', '17', '18'], "desiredSkills":['26','14', '19'], "client": 'Specsavers' },
    {"id": "008", type:"person", "name": "Dylan Cravatte", "location": "Sydney", "currentSkills":['14', '17', '18'], "desiredSkills":['11', '12'], "client": 'Pfizer' },
    {"id": "009", type:"person", "name": "Jeremy Maguello", "location": "London", "currentSkills":['15', '16', '17', '18', '19'], "desiredSkills":['26','12', '18'], "client": 'Specsavers' },
    {"id": "010", type:"person", "name": "Sydney Hitchcock", "location": "London", "currentSkills":['26','25','15', '16', '11', '18'], "desiredSkills":['23','12', '18', '17'], "client": 'Specsavers' },
    {"id": "011", type:"person", "name": "Billy Stevenson", "location": "London", "currentSkills":['12', '16', '13', '18'], "desiredSkills":['23','14'], "client": 'Ladbrokes' },
    {"id": "012", type:"person", "name": "James Wiltshire", "location": "London", "currentSkills":['23','14', '15', '13', '18'], "desiredSkills":['17', '20'], "client": 'N/A' },
    {"id": "013", type:"person", "name": "Nickolas Wilson", "location": "Chichester", "currentSkills":['11', '12', '17', '18'], "desiredSkills":['19', '20'], "client": 'Pfizer' },
    {"id": "014", type:"person", "name": "Timothy Tresuguet", "location": "Chichester", "currentSkills":['11', '18'], "desiredSkills":['17', '16', '13'], "client": 'N/A' },
    {"id": "015", type:"person", "name": "Richard Grayson", "location": "Chichester", "currentSkills":['23','13','14', '18'], "desiredSkills":['17', '19', '12'], "client": 'Specsavers' },
    {"id": "016", type:"person", "name": "Neil Young", "location": "London", "currentSkills":['26','11','12', '16'], "desiredSkills":['22','13'], "client": 'Ladbrokes' },
    {"id": "017", type:"person", "name": "Elvis Iglesias", "location": "Chichester", "currentSkills":['14','33', '20'], "desiredSkills":['22','13'], "client": 'N/A' },
    {"id": "018", type:"person", "name": "Jimmy Black", "location": "London", "currentSkills":['15', '19'], "desiredSkills":['14'], "client": 'N/A' },

    {"id": "019", type:"person", "name": "Glenda Mendez", "location": "London", "currentSkills":['34', '33', '14', '20'], "desiredSkills":['22','12'], "client": 'Specsavers' },
    {"id": "020", type:"person", "name": "Justin Yancey", "location": "Chichester", "currentSkills":['19','11', '15', '16'], "desiredSkills":['19'], "client": 'Specsavers' },
    {"id": "021", type:"person", "name": "Mandy Prestonia", "location": "London", "currentSkills":['19','12', '32', '14'], "desiredSkills":['15', '17'], "client": 'Specsavers' },
    {"id": "022", type:"person", "name": "Edward Magloiros", "location": "Chichester", "currentSkills":['12', '23', '15'], "desiredSkills":['14', '13'], "client": 'Pfizer' },
    {"id": "023", type:"person", "name": "Frank Renner", "location": "Chichester", "currentSkills":['31', '13', '32'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "024", type:"person", "name": "Ralph Geborand", "location": "London", "currentSkills":['19','21', '17', '31', '31', '29'], "desiredSkills":['35', '27'], "client": 'Pfizer'},
    {"id": "025", type:"person", "name": "Ralph Yarbrough", "location": "London", "currentSkills":['23', '17', '18'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "026", type:"person", "name": "Mandy Cravatte", "location": "Sydney", "currentSkills":['23','24', '17', '18'], "desiredSkills":['11', '12'], "client": 'Pfizer' },
    {"id": "027", type:"person", "name": "Jeremy Younger", "location": "London", "currentSkills":['25', '26', '17', '18', '19'], "desiredSkills":['19','12', '18'], "client": 'Specsavers' },
    {"id": "028", type:"person", "name": "Sydney Arellano", "location": "London", "currentSkills":['25','15', '26', '11', '18'], "desiredSkills":['19','12', '18', '17'], "client": 'Specsavers' },
    {"id": "029", type:"person", "name": "William Stevenson", "location": "London", "currentSkills":['26', '26', '13', '18'], "desiredSkills":['19','14'], "client": 'Ladbrokes' },
    {"id": "030", type:"person", "name": "James Reynolds", "location": "London", "currentSkills":['25','14', '15', '13', '18'], "desiredSkills":['35', '20'], "client": 'N/A' },
    {"id": "032", type:"person", "name": "Nickolas Allman", "location": "Chichester", "currentSkills":['25','27', '12', '17', '18','19'], "desiredSkills":['35', '34'], "client": 'Pfizer' },
    {"id": "033", type:"person", "name": "Ronald Tresuguet", "location": "Chichester", "currentSkills":['25','28', '18'], "desiredSkills":['17', '16', '13'], "client": 'N/A' },
    {"id": "034", type:"person", "name": "Richard Arndt", "location": "Chichester", "currentSkills":['13','14', '18'], "desiredSkills":['17', '19', '12'], "client": 'Specsavers' },
    {"id": "035", type:"person", "name": "Neil Ramos", "location": "London", "currentSkills":['22','24','29', '30'], "desiredSkills":['13'], "client": 'Ladbrokes' },
    {"id": "036", type:"person", "name": "Elvis Raines", "location": "Chichester", "currentSkills":['22','14','31', '20','33'], "desiredSkills":['13','32'], "client": 'N/A' },
    {"id": "037", type:"person", "name": "Erica Mccarthy", "location": "London", "currentSkills":['25', '19', '35'], "desiredSkills":['22','14', '34'], "client": 'N/A' },

    {"id": "038", type:"person", "name": "Glenda Youngblood", "location": "London", "currentSkills":['34', '33', '14', '20'], "desiredSkills":['22','12'], "client": 'Specsavers' },
    {"id": "039", type:"person", "name": "Justin Yanez", "location": "Chichester", "currentSkills":['19','11', '15', '16'], "desiredSkills":['19', '22'], "client": 'Specsavers' },
    {"id": "040", type:"person", "name": "Mandy Yu", "location": "London", "currentSkills":['19','12', '32', '14'], "desiredSkills":['15', '17'], "client": 'Specsavers' },
    {"id": "041", type:"person", "name": "Edward Townes", "location": "Chichester", "currentSkills":['12', '23', '15'], "desiredSkills":['14', '22'], "client": 'Pfizer' },
    {"id": "042", type:"person", "name": "Frank Thornhill", "location": "Chichester", "currentSkills":['31', '13', '32'], "desiredSkills":['24', '19'], "client": 'Specsavers' },
    {"id": "043", type:"person", "name": "Ralph Talbott", "location": "London", "currentSkills":['19','21', '17', '31', '31', '29'], "desiredSkills":['35', '27'], "client": 'Pfizer'},
    {"id": "044", type:"person", "name": "Ralph Thurston", "location": "London", "currentSkills":['23', '17', '18'], "desiredSkills":['14', '19'], "client": 'Specsavers' },
    {"id": "045", type:"person", "name": "Mandy Tillman", "location": "Sydney", "currentSkills":['23','24', '17', '18'], "desiredSkills":['11', '12'], "client": 'Pfizer' },
    {"id": "046", type:"person", "name": "Jeremy Terrell", "location": "London", "currentSkills":['25', '26', '17', '18', '19'], "desiredSkills":['19','12', '18'], "client": 'Specsavers' },
    {"id": "047", type:"person", "name": "Sydney Teeter", "location": "London", "currentSkills":['25','15', '26', '11', '18'], "desiredSkills":['19','12', '18', '17'], "client": 'Specsavers' },
    {"id": "048", type:"person", "name": "William Thomason", "location": "London", "currentSkills":['26', '26', '13', '18'], "desiredSkills":['19','14'], "client": 'Ladbrokes' },
    {"id": "049", type:"person", "name": "James Tyson", "location": "London", "currentSkills":['25','14', '15', '13', '18'], "desiredSkills":['35', '20'], "client": 'N/A' },
    {"id": "050", type:"person", "name": "Nickolas Ellington", "location": "Chichester", "currentSkills":['25','27', '12', '17', '18','19'], "desiredSkills":['35', '34'], "client": 'Pfizer' },
    {"id": "051", type:"person", "name": "Ronald Earley", "location": "Chichester", "currentSkills":['25','28', '18'], "desiredSkills":['17', '16', '13'], "client": 'N/A' },
    {"id": "052", type:"person", "name": "Richard Ervin", "location": "Chichester", "currentSkills":['13','14', '18'], "desiredSkills":['17', '19', '12'], "client": 'Specsavers' },
    {"id": "053", type:"person", "name": "Neil Espinosa", "location": "London", "currentSkills":['22','24','29', '30'], "desiredSkills":['13'], "client": 'Ladbrokes' },
    {"id": "054", type:"person", "name": "Elvis Epstein", "location": "Chichester", "currentSkills":['22','14','31', '20','33'], "desiredSkills":['13','32'], "client": 'N/A' },
    {"id": "055", type:"person", "name": "Erica Estrada", "location": "London", "currentSkills":['35', '19', '35'], "desiredSkills":['22','14', '34'], "client": 'N/A' }
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
    {"id": "20",  type:"skill", "name": "Digital Marketing" },

    {"id": "21",  type:"skill", "name": "Data Science"},
    {"id": "22",  type:"skill", "name": "Adobe Photoshop" },
    {"id": "23",  type:"skill", "name": "Adobe Indesign" },
    {"id": "24",  type:"skill", "name": "Wordpress" },
    {"id": "25",  type:"skill", "name": "SEO" },
    {"id": "26",  type:"skill", "name": "Agile" },
    {"id": "27",  type:"skill", "name": "Drupal 8" },
    {"id": "28",  type:"skill", "name": "Postgresql" },
    {"id": "29",  type:"skill", "name": "SQL" },
    {"id": "30",  type:"skill", "name": "NoSQL" },

    {"id": "31",  type:"skill", "name": "Linux" },
    {"id": "32",  type:"skill", "name": "C++" },
    {"id": "33",  type:"skill", "name": "Unity" },
    {"id": "34",  type:"skill", "name": "PHP" },
    {"id": "35",  type:"skill", "name": ".NET" },
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
