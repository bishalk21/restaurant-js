const carousel = document.querySelector(".carousel-wrapper");
const container = carousel.querySelector(".carousel-container");
const pagination = carousel.querySelector(".carousel-pagination");
const bullets = carousel.querySelectorAll(".carousel-bullet");
console.log(bullets, typeof bullets);
const bulletsArr = [].slice.call(carousel.querySelectorAll(".carousel-bullet"));
// call method helps
console.log(bulletsArr);
const totalItems = container.querySelectorAll(".carousel-item").length;
console.log(totalItems);
const percent = 100 / totalItems;
console.log(percent);

let currentIndex = 0;

function slideTo(index) {
  index = index < 0 ? totalItems - 1 : index >= totalItems ? 0 : index;
  container.style.WebkitTransform = container.style.transform =
    "translate(-" + index * percent + "%, 0)";
  bulletsArr[currentIndex].classList.remove("active-bullet");
  bulletsArr[index].classList.add("active-bullet");
  currentIndex = index;
}

bullets[currentIndex].classList.add("active-bullet");

pagination.addEventListener(
  "click",
  (e) => {
    const index = bulletsArr.indexOf(e.target);
    console.log(index);

    if (index !== -1 && index !== currentIndex) {
      slideTo(index);
    }
  },
  false
);
