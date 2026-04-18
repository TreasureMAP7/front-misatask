let user = JSON.parse(localStorage.getItem("user"));
if (user && user.login == true) {
  window.location.href = "/view/home.html"
}

// Carousel
const carousel = document.querySelector(".carousel"); // Pembungkusnya
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const slideWidth = carousel.querySelector(".slide").offsetWidth; // Panjang 1 slide

document.addEventListener("DOMContentLoaded", () => {
  let carouselLeft = carousel.scrollLeft;
  let carouselWidth = carousel.scrollWidth;
  let progressLeft = carouselLeft + carousel.clientWidth;
  if (carouselLeft <= 0) {
    leftBtn.classList.add("opacity-0", "pointer-events-none");
  } else if (progressLeft >= carouselWidth - 10) {
    rightBtn.classList.add("opacity-0", "pointer-events-none");
  }
});

carousel.addEventListener("scroll", () => {
  let carouselLeft = carousel.scrollLeft;
  let carouselWidth = carousel.scrollWidth;
  let progressLeft = carouselLeft + carousel.clientWidth;
  if (carouselLeft <= 10) {
    leftBtn.classList.add("opacity-0", "pointer-events-none");
  } else if (progressLeft >= carouselWidth - 10) {
    rightBtn.classList.add("opacity-0", "pointer-events-none");
  } else {
    leftBtn.classList.remove("opacity-0", "pointer-events-none");
    rightBtn.classList.remove("opacity-0", "pointer-events-none");
  }
});

function scrollCarousel(dir) {
  if (dir === "left") {
    carousel.scrollBy({ left: -slideWidth, behavior: "smooth" });
  } else {
    carousel.scrollBy({ left: slideWidth, behavior: "smooth" });
  }
}

// FAQs Accordion
document.querySelectorAll(".click").forEach((item) => {
  item.addEventListener("click", () => {
    const article = item.nextElementSibling;
    if (article.classList.contains("grid-rows-[0fr]")) {
      article.classList.add("grid-rows-[1fr]");
      article.classList.remove("grid-rows-[0fr]");
    } else {
      article.classList.add("grid-rows-[0fr]");
      article.classList.remove("grid-rows-[1fr]");
    }
    const icon = item.querySelector(".icon");
    if (icon.classList.contains("rotate-0")) {
      icon.classList.add("rotate-90");
      icon.classList.remove("rotate-0");
    } else {
      icon.classList.add("rotate-0");
      icon.classList.remove("rotate-90");
    }
  });
});

// Debugging
// document.querySelectorAll(".disabled").forEach((item) => {
//   item.addEventListener("click", (e) => {
//     e.preventDefault();
//   });
// });
