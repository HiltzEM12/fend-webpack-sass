function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '482619460b0b5529ab4cde59127b0ac2'

    let url = createWeatherURL(baseURL, formText, apiKey);
    callWeatherAPI(url);


    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => {
        return res.json()
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message
    })
}

export { handleSubmit }

//Wrapper to create the URL to call the weather API
function createWeatherURL(baseURL, zipCodeField, apiKey) {
    return baseURL + zipCodeField + '&units=imperial&appid=' + apiKey
};


// Function for handling the API call to the weather site
// Just returns the temperature and a number
async function callWeatherAPI(url = '') {
    const request = await fetch(url);
    // Throw an error on a 404
    if (request.status === 404) throw new Error('Bad zip code');
    try {
        // Transform to JSON
        const data = await request.json();
        // Get the temperature
        const results = document.getElementById('results');
        results.innerHTML = "Temperature is " + data.main.temp
        //alert("Temperature is " + data.main.temp)
    } catch (error) {
        console.log('error', error);
    }
};