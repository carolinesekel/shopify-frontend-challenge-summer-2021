const apiKey = config.MY_KEY;
let url = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=Ram";

const resultsLabel = document.getElementById("results-label");

fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // Work with JSON data here
        console.log(data)
    })
    .catch((err) => {
        // Do something for an error here
    })