const GEO_CODING_SERVER = 'https://geocoding-api.open-meteo.com/v1'
const GEO_CODING_BASE = GEO_CODING_SERVER + '/search?name='
const FORECAST_SERVER = 'https://api.open-meteo.com/v1'
const FORECAST_BASE = FORECAST_SERVER + '/forecast?hourly=temperature_2m'

const geoSearchForm = document.querySelector('#city-search')
const geoSearchField = document.querySelector('#city-name')
const citiesList = document.querySelector('#cities-list')
const tempList = document.querySelector('#temp-list')

function drawCitiesList(cities) { 
  citiesList.innerHTML = ''

  cities.forEach(function (city) { 
    const liElem = document.createElement('li')
    liElem.innerText = `${city.name}, ${city.country}`
    citiesList.appendChild(liElem)

    const chooseCityBtn = document.createElement('button')
    chooseCityBtn.innerText = 'Check weather'
    chooseCityBtn.addEventListener('click', function () { 
      getWeatherFor(city.latitude, city.longitude)
    })
    liElem.appendChild(chooseCityBtn)
  })
}

geoSearchForm.addEventListener('submit', async function (e) {
  e.preventDefault()

  const searchTerm = geoSearchField.value

  const res = await fetch(GEO_CODING_BASE + searchTerm)
  const data = await res.json()

  drawCitiesList(data.results)
})

async function getWeatherFor(lat, lon) { 
  const res = await fetch(FORECAST_BASE + `&latitude=${lat}&longitude=${lon}`)
  const data = await res.json()

  tempList.innerHTML = ''
  data.hourly.time.forEach(function (time, index) { 
    const liElem = document.createElement('li')
    liElem.innerText = `${time}: ${data.hourly.temperature_2m[index]}`
    tempList.appendChild(liElem)
  })
}
