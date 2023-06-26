import countryList from "./countries.json" assert { type: "json" };

const button = document.querySelector("button");

const countrySelector = document.querySelector("select");

countryList.forEach((country) => {
  let newOption = document.createElement("option");
  newOption.innerText = country.Country;
  newOption.setAttribute("id", `${country.Country}`);
  newOption.setAttribute("value", `${country["ISO Code"]}`);
  countrySelector.append(newOption);
});

const fetchName = (name, country) =>
  fetch(`https://api.agify.io/?name=${name}&country_id=${country}`);

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
        document.body.append(newLog);
      }
    })
    .catch((error) => {
      alert("there seems to have been an " + error);
    });
};

button.addEventListener("click", (e) => {
  const nameInput = document.querySelector("input").value;
  const countrySelect = document.getElementById("country-select").value;
  fetchInfo(nameInput, countrySelect);
});
