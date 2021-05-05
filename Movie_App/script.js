const API_CAMP = 'https://v1.nocodeapi.com/nnnccc/webflow/JPVfkrYrvpjiAPIo'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
// Get initial camps
getAllCamps(API_CAMP)
getData(API_CAMP)
getLocation()
//49.2805637 -123.0728657
let lat = 0
let lon = 0
function showLocation(position) {
  lat = position.coords.latitude
  // console.log('lat:', lat)
  lon = position.coords.longitude
  // console.log('lon:', lon)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation)
  } else {
    console.error('error')
  }
}

function initMap() {
  var options = {
    center: { lat: lat, lng: lon },
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }
  // console.log('options:', options.center)

  map = new google.maps.Map(document.getElementById('map'), options)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

async function getAllCamps(url) {
  const res = await fetch(url)

  const data = await res.json()

  showCamps(data.items)
}

function showCamps(movies) {
  let maxDistance = 50
  main.innerHTML = ''

  movies.forEach((movie) => {
    // console.log('CAMPSKJLKJLKJ', movie)
    const {
      name,
      url,
      city,
      'camp-details': campDetails,
      lattitude,
      longitude,
    } = movie

    // 49.184078416193536, -123.12054758821616,
    // console.log('LATITUDE', lat)
    // console.log('Longitude', lon)
    let results = getDistanceFromLatLonInKm(lat, lon, lattitude, longitude)
    // console.log('results:', results)

    if (results <= maxDistance) {
      const movieEl = document.createElement('div')
      movieEl.classList.add('movie')

      movieEl.innerHTML = `
      <img src="${url}" alt="${name}">
      <div class="movie-info">
        <h3>${city}</h3>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${campDetails}
      </div>`

      main.appendChild(movieEl)
    } else {
      const movieEl = document.createElement('div')
      movieEl.classList.add('movie')

      movieEl.innerHTML = `
      <img src="${url}" alt="${name}">
      <div class="movie-info">
        <h3>${city}</h3>
      </div>
      <div class="overview">
        <h3>overview</h3>
        ${campDetails}
      </div>`

      main.appendChild(movieEl)
    }

    // console.log('WILL THIS WORK')
    // console.log(
    //   getDistanceFromLatLonInKm(
    //     49.184078416193536,
    //     -123.12054758821616,
    //     49.2805413,
    //     -123.075031
    //   )
    // )

    // console.log('lattitude:', lattitude)
    // console.log('longitude:', longitude)
  })
}

// input is the url from backend
async function getData(camps) {
  const res = await fetch(camps)

  const data = await res.json()

  getCampCity(data.items)
}

function getCampCity(availableCamps) {
  let r
  let c = 0
  availableCamps.forEach((camp) => {
    console.log('CAMPER', camp)
    const { city, lattitude, longitude, name, _id } = camp
    let b = city.split(' ')
    for (let i = 0; i < b.length; i++) {
      r = b[i].toLowerCase()
      console.log(r)
      c++
      console.log(c)
    }
  })
}
//let regex = (/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  //this is a string output
  const searchTerm = search.value
  let lower = searchTerm.toLowerCase()
  console.log(lower)

  if (lower && lower !== '') {
    // getAllCamps(SEARCH + lower)

    search.value = ''
  } else {
    window.location.reload()
  }
})

//  <span class="${getClassByRate(vote_average)}">${vote_average}</span>
