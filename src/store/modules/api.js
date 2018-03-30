
// const success = await fetch(`https://damp-sands-22859.herokuapp.com`)
// const success = await fetch(`http://localhost:3000/skillsMatrix`)
// const success = await fetch(`https://infinite-mountain-98644.herokuapp.com`)

export function getData() {
  return fetch(`http://localhost:3000/skillsMatrix`)
  .then(res => res.json())
  .catch(error => {
    console.log("error with fetching data: ",error)
    return error
  })
}
