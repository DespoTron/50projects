// Our root URL
const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username)

    createUserCard(data)
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard('No profile with this username')
    }
  }
}

function createUserCard(user) {
  const cardHTML = `
  <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>

        <div id="repos"></div>

      </div>
    </div>
      `
  main.innerHTML = cardHTML
}

function createErrorCard(message) {
  const cardHTML = `
    <div class="card">
      <h1>${message}</h1>
    </div>
  `
  main.innerHTML = cardHTML
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
