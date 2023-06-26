const button = document.querySelector("button");
const fetchName = (name) => fetch("https://api.agify.io/?name=" + name);

const fetchInfo = (name) => {
  fetchName(name)
    .then((response) => response.json())
    .then((json) => {
      if (json.age == null){
        alert("the name " + name + " is not in the database")
      } else{
      let newLog = document.createElement("div");
      let newEntry = `${json.name} are on average ${json.age} year old and there are ${json.count} of them`;
      newLog.append(newEntry);
      document.body.append(newLog);}
    })
    .catch((error) => {
      alert("there seems to have been an "+error);
    });
};

button.addEventListener("click", (e) => {
  const nameInput = document.querySelector("input").value;
  fetchInfo(nameInput);
});
