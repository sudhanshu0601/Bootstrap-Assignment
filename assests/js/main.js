/* navbar section*/
const toggleButton = document.querySelector(".my__toggle");
const navbar = document.querySelector(".my__navbar");

toggleButton.addEventListener("click", () => {
  navbar.classList.toggle("show");
  toggleButton.classList.toggle("show");
  if (navbar.classList.contains("show")) {
    toggleButton.classList.replace("bi-list", "bi-x");
  } else {
    toggleButton.classList.replace("bi-x", "bi-list");
  }
});
// end of navbar section

//portfolio section

//end of porfolio section

/* faq section*/
const tabButtons = document.querySelectorAll(".faq__main__tabs .nav-link");
const tabPanes = document.querySelectorAll(".faq__main__content .tab-pane");

tabButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    tabPanes.forEach((pane) => {
      pane.classList.remove("show", "active");
    });

    tabPanes[index].classList.add("show", "active");
  });
});


const faqItems = document.querySelectorAll(".faq__main__content__item");

faqItems.forEach((item) => {
  const heading = item.querySelector("h3");

  heading.addEventListener("click", () => {
    item.classList.toggle("faq-active");
  });
});
//end of faq section