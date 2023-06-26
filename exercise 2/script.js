//Import a JSON file with ISO list of countries available in the API.
import countryList from "./countries.json" assert { type: "json" };

//Declares constants for selectors
const button = document.querySelector("button");
const countrySelector = document.querySelector("select");

//Populates the select element with all the country options
countryList.forEach((country) => {
  let newOption = document.createElement("option");
  newOption.innerText = country.Country;
  newOption.setAttribute("id", `${country.Country}`);
  newOption.setAttribute("value", `${country["ISO Code"]}`);
  countrySelector.append(newOption);
});

//Add locally stored queries
console.log(localStorage.length);
for (let i = 1; i <= localStorage.length; i++) {
  let oldEntry = document.createElement("div");
  oldEntry.innerText = localStorage.getItem(`entry${i}`);
  document.body.append(oldEntry);
}

//Fetches the object arguments from the API
const fetchName = (name, country) =>
  fetch(`https://api.agify.io/?name=${name}&country_id=${country}`);

//Fetches the arguments from the fetchName function and displays the average age and population for a specific name

const fetchInfo = (name, country) => {
  fetchName(name, country)
    .then((response) => response.json())
    .then((json) => {
      if (json.age == null) {
        alert("the name " + name + " is not in the database");
      } else {
        console.log(json.country_id);

        console.log(json.country_id);
        let newLog = document.createElement("div");
        let newEntry = `${json.name} are on average ${
          json.age
        } year old and there are ${json.count} of them in ${
          document.querySelector("select").options[
            document.querySelector("select").selectedIndex
          ].id
        }`;
        newLog.append(newEntry);
        localStorage.setItem(`entry${localStorage.length + 1}`, newEntry);
        document.body.append(newLog);
      }
    })
    .catch((error) => {
      alert("there seems to have been an " + error);
    });
};

//Triggers the fetchInfo function when the button is clicked and passes the arguments based on the input and selected country
button.addEventListener("click", (e) => {
  const nameInput = document.querySelector("input").value;
  const countrySelect = document.getElementById("country-select").value;
  fetchInfo(nameInput, countrySelect);
});

//Create a clear button next to the get name stats
const clearButton = document.createElement("button");
clearButton.innerText = "Clear";
button.after(clearButton);

//Clears the content of the local storage and refreshes the page
clearButton.addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
});

console.log(localStorage);