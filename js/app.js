const apiKey = config.MY_KEY;
let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;

//get HTML elements
const resultsLabel = document.getElementById("results-label");
const resultsList = document.getElementById("results-list");
const nominationsList = document.getElementById("nominations-list");

const searchButton = document.getElementById("searchSubmit");
const input = document.getElementById("search");

//list of current nominations
let currentNominations = [];

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
                //console.log(movie.Title)
                //console.log(movie.Year)
                //list item for movie
                const resultItem = document.createElement('li');
                const movieDetails = document.createTextNode(`${movie.Title} (${movie.Year}) `);
                resultItem.appendChild(movieDetails);
                //button to nominate
                const nominateButton = document.createElement('button');
                nominateButton.classList.add("nominate-button");
                const buttonLabel = document.createTextNode("Nominate");
                nominateButton.appendChild(buttonLabel);
                //console.log(nominateButton);
                resultItem.appendChild(nominateButton);
                //add item to list
                resultsList.appendChild(resultItem);

                console.log(`button parent child1 text: ${nominateButton.parentElement.childNodes[0].textContent}`);

                //console.log(`button parent  textcontent: ${nominateButton.parentElement.textContent}`);


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
//add to newSearch function? or best to separate working with input from other functionality
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

resultsList.addEventListener("click", (event) => {
    let elementClicked = event.target;
    //check if clicked nominate button
    //console.log(elementClicked.classList.value);
    if (elementClicked.classList.value == "nominate-button") {
        const movieDetails = `${elementClicked.parentElement.childNodes[0].textContent}`;
        //console.log(movieDetails);
        nominate(movieDetails);
    }
})


function nominate(movieDetails) {
    const nominationItem = document.createElement('li');
    const nominationDetails = document.createTextNode(movieDetails);
    nominationItem.appendChild(nominationDetails);
    const removeButton = document.createElement('button');
    removeButton.classList.add("remove-button");
    const buttonLabel = document.createTextNode("Remove");
    removeButton.appendChild(buttonLabel);
    //console.log(nominateButton);
    nominationItem.appendChild(removeButton);
    //add item to list
    nominationsList.appendChild(nominationItem);
}