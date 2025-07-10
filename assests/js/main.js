document.addEventListener("DOMContentLoaded", () => {
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

  const toggles = document.querySelectorAll(".toggle-dropdown");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parentLi = this.closest("li");

      parentLi.classList.toggle("active");
    });
  });
  // end of navbar section

  //altFeatures section
  const altFeaturesTab = document.querySelectorAll(
    ".altFeatures__navigation__link"
  );
  const altFeaturesPane = document.querySelectorAll(
    ".altFeatures__content__panel"
  );

  altFeaturesTab.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      altFeaturesTab.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      altFeaturesPane.forEach((pane) => {
        pane.classList.remove("show", "active");
      });

      altFeaturesPane[index].classList.add("show", "active");
    });
  });
  //end of altFeatures section

  //portfolio section
  const featuresFilterBtn = document.querySelectorAll(
    ".portfolio__content__sidebar__nav li"
  );
  const featuresPortfolioItems = document.querySelectorAll(".portfolio-item");

  function filterItems(filterValue) {
    featuresPortfolioItems.forEach((item) => {
      if (
        filterValue === "*" ||
        item.classList.contains(filterValue.substring(1))
      ) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  }

  featuresFilterBtn.forEach((button) => {
    button.addEventListener("click", () => {
      featuresFilterBtn.forEach((btn) => btn.classList.remove("filter-active"));
      button.classList.add("filter-active");

      const filterValue = button.getAttribute("data-filter");
      filterItems(filterValue);
    });
  });

  const defaultFilter = document.querySelector(
    '.portfolio__content__sidebar__nav li[data-filter="*"]'
  );
  if (defaultFilter) {
    defaultFilter.classList.add("filter-active");
    filterItems("*");
  }

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

  //team section
  const track = document.querySelector(".team__slider__wrapper");
  const nextBtn = document.querySelector(".team__next");
  const prevBtn = document.querySelector(".team__prev");

  let isAnimating = false;
  let cardWidth = getCardWidth();

  function getCardWidth() {
    const card = track.querySelector(".team__slider__wrapper__swipe");
    const style = window.getComputedStyle(card);
    const gap = parseFloat(style.marginRight) || 30;
    return card.getBoundingClientRect().width + gap;
  }

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${cardWidth}px)`;

    setTimeout(() => {
      const first = track.children[0];
      track.appendChild(first);
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      isAnimating = false;
    }, 500);
  }

  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;

    const last = track.children[track.children.length - 1];
    track.insertBefore(last, track.children[0]);
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = "translateX(0)";
      });
    });

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  window.addEventListener("resize", () => {
    cardWidth = getCardWidth();
  });
  
  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);

  setInterval(() => {
    slideNext();
  }, 4000);

  //end of team section
});
