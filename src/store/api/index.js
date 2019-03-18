
const URL = "https://serene-ocean-70888.herokuapp.com/skillsMatrix"

const delay = (time) => new Promise((res) => setTimeout(() => res(), time))

export async function getData() {
  const getPromise = fetch(URL)
  const delayPromise = delay(2000)

  try {
    const data = await Promise.all([getPromise, delayPromise])
    return await data[0].json()
  } catch (error) {
    console.log(error)
    return "Error"
  }
}
