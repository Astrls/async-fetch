const button = document.querySelector("button");

const fetchBecode = () => {
  let newList = document.createElement("ul");
  button.before(newList);
  fetch("becode.json")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((sentence) => {
        newItem = document.createElement("li");
        newItem.innerText = sentence;
        newList.append(newItem);
      });
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};



button.addEventListener("click", e => {
    fetchBecode();
})
