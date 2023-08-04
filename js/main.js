let apiURL = 'https://api.weatherapi.com/v1/forecast.json?key=98c9207409674a30b0835544230208&q=lond&days=3';
var form = document.querySelector('form')
var location = document.querySelector('data-location')
var date = document.querySelector('data-data')
var temperature = document.querySelector('data-temperature')
var temperatureText = document.querySelector('data-temperature-text')
var img = document.querySelector('data-image')


// console.log(apiURL)

form.addEventListener('keyup', async(e) => {
    e.preventDefault()
    gatWeather()
})

var gatWeather = async () => {
    var days = []
    var otherDays = []
    var locationValid = location.value

    await fetch(apiURL + `&q=${locationValid}`)
    .then(Response => Response.json())
    .then(({forecast , locationValid}) => {
        forecast.forecastday.map(item => {
            days.push({
                icon : item.day.condition.icon,
                text : item.day.condition.text,
                temp : Math.round(item.day.avgtemp_c),
                country : locationValid.country,
                time : locationValid.localtime.split('')[1],
                day : new Date(item.data).toLocaleDateString('en-GB', {weekday: 'long'})


            })
        })
    })

    var firstData =days[0]

    temperature.innerHTML = firstData.temp
    temperatureText.innerHTML = firstData.text
    date.innerHTML = firstData.country + ' - ' + firstData.day + ' , ' + firstData.time
    img.src = "https://" + firstData.icon

    days.map((item, i) => {
        if(i >0) {
            otherDays.push(`
            <div class='day-item'>
            <div> ${item.day}</div>
            <img src="https://${item.icon}" width="60" class="data-image">
            <div class="data-temperature">
                <span>${item.temp}</span><sup>o</sup><small>c</small>
            </div>
            <div class="data-temperature-text">${item.text}</div>

            `

            )
        }
    })

    document.querySelector('.app-card-bottom').innerHTML = otherDays.join('')
}

gatWeather()
