const GEO_CODING_SERVER = 'https://geocoding-api.open-meteo.com/v1'
const GEO_CODING_BASE = GEO_CODING_SERVER + '/search?name='

const geoSearchForm = document.querySelector('#city-search')
const geoSearchField = document.querySelector('#city-name')
const citiesList = document.querySelector('#cities-list')

function drawCitiesList(cities) { 
  citiesList.innerHTML = ''

  cities.forEach(function (city) { 
    const liElem = document.createElement('li')
    liElem.innerText = `${city.name}, ${city.country}`
    citiesList.appendChild(liElem)
  })
}

geoSearchForm.addEventListener('submit', async function (e) {
  e.preventDefault()

  const searchTerm = geoSearchField.value

  const res = await fetch(GEO_CODING_BASE + searchTerm)
  const data = await res.json()

  drawCitiesList(data.results)
})
