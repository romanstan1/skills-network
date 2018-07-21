import {seededSkillsData} from './seed.js'

const URL = `https://serene-ocean-70888.herokuapp.com/skillsMatrix`

// return seededSkillsData
export async function getData() {
  const delay = time => new Promise(res=>setTimeout(()=>res(),time));
  await delay(2000);

  try {
    const data = await fetch(URL)
    console.log('data', data)
    return await data.json()
  }
  catch(error) {
    console.log(error)
    return seededSkillsData
    return 'Error'
  }
}
