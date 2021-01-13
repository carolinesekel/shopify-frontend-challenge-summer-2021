const apiKey = config.MY_KEY;
let url = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=";

const resultsLabel = document.getElementById("results-label");
const resultsList = document.getElementById("results-list");
const nominationsList = document.getElementById("nominations-list");


function newSearch(searchTerm) {
    updatedHtml = ' "' + searchTerm + '"';
    resultsLabel.insertAdjacentHTML("beforeend", updatedHtml)
    const finalUrl = url + searchTerm;
    fetch(finalUrl)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Work with JSON data here
            console.log(data)
            data.Search.forEach((movie) => {
                console.log(movie.Title)
                console.log(movie.Year)
                var resultItem = document.createElement('li');
                resultItem.textContent = `${movie.Title} (${movie.Year})`;
                resultsList.appendChild(resultItem);
            })
        })
        .catch((err) => {
            // Do something for an error here
        })
}
newSearch("Ram");