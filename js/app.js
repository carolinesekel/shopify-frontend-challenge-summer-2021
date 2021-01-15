//const apiKey = config.MY_KEY;
//let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
let url = `http://www.omdbapi.com/?apikey=5bc46a90&s=`;

//get HTML elements
const resultsLabel = document.getElementById("results-label");
const resultsList = document.getElementById("results-list");
const nominationsList = document.getElementById("nominations-list");

const searchButton = document.getElementById("searchSubmit");
const input = document.getElementById("search");

const shareButton = document.getElementById("share");

//number of initial nominations
let numberOfNumonations = 0;


function newSearch(searchTerm) {
    //update results label with new search term 
    resultsLabel.textContent = `Results for "${searchTerm}"`;
    //delete old list if there is one
    resultsList.innerHTML = "";
    //fetch data based on search term 
    const finalUrl = url + searchTerm;
    fetch(finalUrl)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Work with JSON data here
            //data.Search holds the list of movies, append list item for each movie
            data.Search.forEach((movie) => {
                //list item for movie
                const resultItem = document.createElement("li");
                const movieDetails = document.createTextNode(`${movie.Title} (${movie.Year}) `);
                resultItem.appendChild(movieDetails);
                //button to nominate
                const nominateButton = document.createElement("button");
                nominateButton.classList.add("nominate-button");
                const buttonLabel = document.createTextNode("Nominate");
                nominateButton.appendChild(buttonLabel);
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
    input.value = "";
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
        input.value = "";
    }
})

function nominate(movieDetails) {
    //list item
    const nominationItem = document.createElement("li");
    const nominationDetails = document.createTextNode(movieDetails);
    nominationItem.appendChild(nominationDetails);
    //button to remove
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    const buttonLabel = document.createTextNode("Remove");
    removeButton.appendChild(buttonLabel);
    nominationItem.appendChild(removeButton);
    //add item to list
    nominationsList.appendChild(nominationItem);
    //update numberOfNominations
    numberOfNumonations += 1;
    checkNumberOfNominations();
}

function removeNomination(nomination) {
    let nominationDetails = nomination.childNodes[0].textContent;
    //remove from list
    nomination.remove();
    //restore nominate button in resultsList
    //how to get back to resultsList to figure out which button to restore?
    //note to self: probably could have avoided this by keeping track of the movies a better way, maybe a list of objects?
    resultsList.childNodes.forEach((li) => {
        let movieDetails = li.childNodes[0].textContent;
        if (movieDetails == nominationDetails) {
            li.childNodes[1].toggleAttribute("disabled");
        }
    });
    //update numberOfNominations
    numberOfNumonations -= 1;
    checkNumberOfNominations();
}
resultsList.addEventListener("click", (event) => {
    let elementClicked = event.target;
    //check if clicked nominate button
    if (elementClicked.classList.value == "nominate-button") {
        const movieDetails = `${elementClicked.parentElement.childNodes[0].textContent}`;
        nominate(movieDetails);
    }
    //disable button after
    elementClicked.setAttribute("disabled", true);

})

nominationsList.addEventListener("click", (event) => {
    let elementClicked = event.target;
    //check if clicked remove button
    if (elementClicked.classList.value == "remove-button") {
        removeNomination(elementClicked.parentNode);
    }
})

function checkNumberOfNominations() {
    if (numberOfNumonations < 5) {
        document.body.classList.remove("full-nominations");
    } else if (numberOfNumonations >= 5) {
        document.body.classList.add("full-nominations");
        /*resultsList.childNodes.forEach((li) => {
            li.childNodes[1].setAttribute("disabled", true);
        })*/
    }
}

//get nominations, format top 5 into string that can be inserted into mailto link
//note to self: realizing this is not necessarily the top 5, but first 5 in the list (since my code lets you nominate more than 5)
function shareNominations() {
    //nominations
    let nominations = [];
    nominationsList.childNodes.forEach((li) => {
        let movieDetails = li.childNodes[0].textContent;
        nominations.push(movieDetails);
    });
    console.log(nominations);
    //top 5 into string to insert into mailto link
    let nominationsString = "";
    for (let i = 0; i < 5; i++) {
        nominationsString += `${nominations[i]}%0D%0A`
    }
    console.log(nominationsString);
    //note to self: there is definitely a better way to do this
    let stringNoSpaces = "";
    for (let char of nominationsString) {
        if (char == " ") {
            stringNoSpaces += "%20";
        } else {
            stringNoSpaces += char;
        }
    }
    console.log(stringNoSpaces);
    //mailto link 
    window.open(`mailto:?subject=Check%20out%20my%20nominations%20for%20the%20Shoppies!&body=I%20nominated%20my%20favorite%20movies%20for%20the%20Shoppies%3A%20Movie%20awards%20for%20entrepreneurs!%0D%0A%0D%0AMy%20top%205%20movies%20were%3A%0D%0A${stringNoSpaces}%0D%0ANominate%20your%20favorites%20at%20%20https%3A%2F%2Fcarolinesekel.github.io%2Fshopify-frontend-challenge-summer-2021%2F!`)
}
shareButton.addEventListener("click", shareNominations);