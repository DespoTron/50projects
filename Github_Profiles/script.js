// Our root URL
const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username)

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const user = search.value

  if (user) {
    getUser(user)

    search.value = ''
  }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Using Axios with .then to fetch API
// function getUser(username) {
//   axios
//     .get(APIURL + username)
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err))
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Using an async/await function with built in fetch to grab api
// async function getUser(username) {
//   const res = await fetch(APIURL + username)
//   const data = await res.json()
//   console.log(data)
// }
