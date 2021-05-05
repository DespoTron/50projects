const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke)

generateJoke()

async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  const res = await fetch(
    'https://v1.nocodeapi.com/nnnccc/webflow/JPVfkrYrvpjiAPIo',
    config
  )

  const data = await res.json()
  console.log(data)
  console.log('what', data.items)
  data.items.forEach((camp) => {
    console.log('camp', camp.name)
    jokeEl.innerHTML = camp.name
  })
}

// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   }

//   fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke
//     })
// }
