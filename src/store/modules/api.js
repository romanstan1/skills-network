import {seededSkillsData} from './seed.js'

export function getData() {
  return seededSkillsData
  return fetch(`https://serene-ocean-70888.herokuapp.com/skillsMatrix`)
  .then(res => res.json())
  .catch(error => {
    console.log(error)
    return 'Error'
  })
}
