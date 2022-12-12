const body = document.body;
// console.log(body);

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  //   console.log(currentScroll);

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    // down
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    // up
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
  console.log(lastScroll);
});

// for scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");
// console.log(scrollBtn);

// on scroll > 500, button appears
window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});

// on click to the scroll to top button
scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const openMenu = document.getElementById("menu");
const menuContent = document.querySelector(".menuContent");
const closeMenu = document.querySelector(".closeBtn");
const imgBefore = document.querySelector(".imgBefore");
const menuLinks = document.querySelectorAll(".fadeLink");
const bodyDocument = document.getElementsByTagName("body")[0];
const mobileLinks = document.querySelectorAll(".mobile-fade");

// menu click openMenu
openMenu.addEventListener("click", () => {
  menuContent.classList.add("openActive");

  // fade in menu links and imgbefore
  imgBefore.style.animation = "load 2.3s ease-in-out";
  menuLinks.forEach((link, index) => {
    link.style.animation = `fade 0.5s ease forwards ${index / 7 + 0.5}s`;
  });

  // sideContent
  document.querySelector(".sideContent span").classList.add("fade");
  bodyDocument.classList.add("bodyMenuOpen");

  // mobile fade
  mobileLinks.forEach((link, index) => {
    mobilelink.style.animation = `mobilefade 0.5s ease forwards ${
      index / 7 + 0.5
    }s`;
  });
});

// close btn closeMenu
closeMenu.addEventListener("click", () => {
  menuContent.classList.remove("openActive");

  // fade out menu links and imgbefore
  imgBefore.style.animation = "";
  menuLinks.forEach((link, index) => {
    link.style.animation = "";
  });

  // sideContent
  document.querySelector(".sideContent span").classList.remove("fade");
  bodyDocument.classList.remove("bodyMenuOpen");

  // mobile fade
  mobileLinks.forEach((link, index) => {
    mobilelink.style.animation = "";
  });
});
