const options = document.querySelectorAll(".option");
const sydney = document.getElementById("sydney");
const melbourne = document.getElementById("melbourne");
const brisbane = document.getElementById("brisbane");
const perth = document.getElementById("perth");
const kathmandu = document.getElementById("kathmandu");
const content = document.getElementById("restaurant-name");

sydney.addEventListener("click", () => {
  //   console.log("Sydney");
  content.innerHTML = "Sydney";
  let selectedVal = document.getElementById("sydney").value;
  //   console.log(selectedVal);
  localStorage.setItem("selectedVal", selectedVal);
  return true;
});

melbourne.addEventListener("click", () => {
  //   console.log("Melbourne");
  content.innerHTML = "Melbourne";
  let selectedVal = document.getElementById("melbourne").value;
  //   console.log(selectedVal);
  localStorage.setItem("selectedVal", selectedVal);
  return true;
});

brisbane.addEventListener("click", () => {
  //   console.log("Brisbane");
  content.innerHTML = "Brisbane";
  let selectedVal = document.getElementById("brisbane").value;
  //   console.log(selectedVal);
  localStorage.setItem("selectedVal", selectedVal);
  return true;
});

perth.addEventListener("click", () => {
  //   console.log("Perth");
  content.innerHTML = "Perth";
  let selectedVal = document.getElementById("perth").value;
  //   console.log(selectedVal);
  localStorage.setItem("selectedVal", selectedVal);
  return true;
});

kathmandu.addEventListener("click", () => {
  //   console.log("Kathmandu");
  content.innerHTML = "Kathmandu";
  let selectedVal = document.getElementById("kathmandu").value;
  //   console.log(selectedVal);
  localStorage.setItem("selectedVal", selectedVal);
  return true;
});

const selected = document.querySelector(".selected");
const optionContainer = document.querySelector(".options-container");
const restBtn = document.querySelector(".find-restaurant-btn button");
const selectRestaurant = document.querySelector(".select-restaurant");

// on click to the selected
selected.addEventListener("click", () => {
  optionContainer.classList.toggle("active");
});

// on click to the options
options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionContainer.classList.remove("active");
    restBtn.classList.add(".restau-active");
    selectRestaurant.classList.add("selected-active");
  });
});
