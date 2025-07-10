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
  const wrapper = document.querySelector(".team__slider__wrapper");
  const nextBtn = document.querySelector(".team__next");
  const prevBtn = document.querySelector(".team__prev");
  let slides = Array.from(
    document.querySelectorAll(".team__slider__wrapper__swipe")
  );

  let index = 0;
  let autoplayDelay = 5000;
  let autoplay = true;
  let intervalId;
  let slideWidth = 0;
  let slidesPerView = 1;

  function getSlidesPerView() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 576) return 2;
    return 1;
  }

  function cloneSlides() {
    const beforeClones = slides
      .slice(-slidesPerView)
      .map((slide) => slide.cloneNode(true));
    const afterClones = slides
      .slice(0, slidesPerView)
      .map((slide) => slide.cloneNode(true));

    beforeClones.forEach((clone) => {
      clone.classList.add("clone");
      wrapper.prepend(clone);
    });

    afterClones.forEach((clone) => {
      clone.classList.add("clone");
      wrapper.append(clone);
    });

    slides = Array.from(wrapper.querySelectorAll(".slide"));
  }

  function goToSlide(newIndex, animated = true) {
    index = newIndex;
    wrapper.style.transition = animated ? "transform 0.5s ease" : "none";
    const offset = (slideWidth + 30) * (index + slidesPerView);
    wrapper.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    index++;
    goToSlide(index);
    if (index >= slides.length - slidesPerView * 2) {
      setTimeout(() => goToSlide(0, false), 510);
    }
  }

  function prevSlide() {
    index--;
    goToSlide(index);
    if (index < 0) {
      setTimeout(
        () => goToSlide(slides.length - slidesPerView * 2 - 1, false),
        510
      );
    }
  }

  function startAutoplay() {
    if (autoplay) {
      intervalId = setInterval(nextSlide, autoplayDelay);
    }
  }

  function resetAutoplay() {
    if (autoplay) {
      clearInterval(intervalId);
      startAutoplay();
    }
  }

  function initSlider() {
    slidesPerView = getSlidesPerView();
    cloneSlides();

    // Wait for layout calculation
    requestAnimationFrame(() => {
      const firstSlide = wrapper.querySelector(".slide");
      if (!firstSlide) {
        console.error("No slides found!");
        return;
      }
      slideWidth = firstSlide.offsetWidth;
      goToSlide(0, false);
      startAutoplay();
    });
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  window.addEventListener("resize", () => {
    location.reload(); // Easy way to re-init clones on resize
  });

  document.addEventListener("DOMContentLoaded", initSlider);
  //end of team section
});
