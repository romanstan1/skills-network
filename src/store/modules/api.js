
export function getData() {
  // return fetch(`http://localhost:3000/skillsMatrix`)
  return fetch(`https://serene-ocean-70888.herokuapp.com/skillsMatrix`)
  .then(res => res.json())
  .catch(error => {
    console.log(error)
    return 'Error'
  })
}
