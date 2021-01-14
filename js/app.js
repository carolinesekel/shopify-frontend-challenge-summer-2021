const apiKey = config.MY_KEY;
let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;

//ger HTML elements
const resultsLabel = document.getElementById("results-label");
const resultsList = document.getElementById("results-list");
const nominationsList = document.getElementById("nominations-list");

const searchButton = document.getElementById("searchSubmit");
const input = document.getElementById("search");


function newSearch(searchTerm) {
    //update results label with new search term 
    resultsLabel.textContent = `Results for "${searchTerm}"`;
    //delete old list if there is one
    resultsList.innerHTML = '';
    //fetch data based on search term 
    const finalUrl = url + searchTerm;
    fetch(finalUrl)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Work with JSON data here
            console.log(data);
            //data.Search holds the list of movies, append list item for each movie
            data.Search.forEach((movie) => {
                console.log(movie.Title)
                console.log(movie.Year)
                    //list item for movie
                let resultItem = document.createElement('li');
                resultItem.textContent = `${movie.Title} (${movie.Year}) `;
                //button to nominate
                const nominateButton = document.createElement('button');
                nominateButton.classList.add("nominate-button");
                nominateButton.textContent = "Nominate";
                console.log(nominateButton);
                resultItem.appendChild(nominateButton);
                //add item to list
                resultsList.appendChild(resultItem);
            })
        })
        .catch((err) => {
            // Do something for an error here
        })
}
//event listener on button to submit search
searchButton.addEventListener("click", () => {
    //get input value from search box
    const searchTerm = input.value;
    //if not empty, run newSearch with submitted search term
    if (searchTerm) {
        newSearch(searchTerm);
    }
    //clear search box 
    input.value = '';
})

//event listener on enter key to submit also
//TODO: way to not repeat this code from first event listener - make function and call in both places?
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        //get input value from search box
        const searchTerm = input.value;
        //if not empty, run newSearch with submitted search term
        if (searchTerm) {
            newSearch(searchTerm);
        }
        //clear search box 
        input.value = '';
    }
})

function addNomination() {

}