// selecting the items
const meals = document.querySelectorAll("#meal");
const filterItems = document.querySelector(".items");

filterItems.addEventListener("click", (selectedItem) => {
  // if user clicks on filterItem div
  if (selectedItem.target.classList.contains("item")) {
    // of user selected an item has .item class list
    filterItems.querySelector(".active").classList.remove("active"); // remove active class list from the first selected item
    selectedItem.target.classList.add("active"); // adding active class to selected item by user

    // getting data-name value of user selected item and storing in a variable
    let filterName = selectedItem.target.getAttribute("data-name");
    // console.log(filterName);
    meals.forEach((meal) => {
      // selecting all meals
      let filterMeals = meal.getAttribute("data-name"); // getting image data-name value
      // console.log(filterMeals);

      // if user selected item data-name value is equal to image data-name value
      // or user selected item data-name value is equal to all
      if (filterName == filterMeals || filterName == "all") {
        meal.classList.remove("hide"); // first remove the hide class from the image
        meal.classList.add("show"); // add show class in image
      } else {
        meal.classList.add("hide"); // add hide class in image
        meal.classList.remove("show"); // remove show class from image
      }
    });
  }
});

// search function
function searchFunction() {
  let input = document.getElementById("myInput");
  let filter = input.value.toUpperCase();
  let menuCards = document.getElementById("menu-cards");
  let li = menuCards.getElementsByTagName("li");
  let title = document.querySelector(".meal-title");

  // loop through all the list items and hide those which doesn't match the search query
  for (let i = 0; i < li.length; i++) {
    let item = li[i].getElementsByTagName("span")[0];
    // console.log(item);
    let itemName = item.textContent || item.innerText;
    if (itemName.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  // slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  // slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  // slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  // console.log(walk);
});
