// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   
   let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML =
                `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}

function validateInput(testInput) {

    if (testInput === "") {
        return "Empty"
    } else if (!isNaN(Number(testInput))) {
        return "Is A Number"
    } else {
        return "Not A Number"
    }
   
       
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
//    LAUNCH INFO LIST ITEMS 
    let launchStatus = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

//    FORM INPUTS VALIDATION
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert(`All fields are required!`)
    } else if ((validateInput(fuelLevel)) === "Not A Number" || (validateInput(cargoLevel)) === "Not A Number") {
        alert(`Make sure to enter valid information for each fieldsssss!`)
    } else if ((validateInput(pilot)) === "Is A Number" || (validateInput(copilot)) === "Is A Number") {
        alert (`Make sure to enter valid information for each field!`)
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }

    // FUEL AND CARGO LEVEL CHECK
    if (Number(fuelLevel) < 10000) {
        list.style.visibility = "visible"
        fuelStatus.innerHTML = "Fuel level too low for launch"
        launchStatus.style.color = "red"
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
    } else if (Number(cargoLevel) > 10000) {
        list.style.visibility = "visible"
        cargoStatus.innerHTML = "Cargo mass too heavy for launch"
        launchStatus.style.color = "#C7254E"
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
    }  else {
        list.style.visibility = "visible"
        launchStatus.style.color = "#419F6A"
        launchStatus.innerHTML = "Shuttle is Ready for Launch"
    }
    
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
       return response.json();     
});
    return planetsReturned;
}

function pickPlanet(planets) {
    let chosenPlanet = planets[Math.floor(Math.random() * planets.length)]

    return chosenPlanet
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
