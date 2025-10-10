// ===== TOGGLE MENU =====
// Show menu functionality
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Hide menu functionality
// Validate if constant exists
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Remove mobile menu
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// ===== END TOGGLE MENU =====

// ===== SCROLL SECTIONS ACTIVE LINK =====
// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ===== CHANGE BACKGROUND HEADER =====
// Change header background on scroll
function scrollHeader() {
  const header = document.getElementById("header");
  // when thw scroll is greater then 50 viewport height, add the scroll header class to header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

// ===== SHOW SCROLL UP =====
// Show scroll to top button
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scrollup class
  if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

// ===== ABOUT TABS =====
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("tab__active");
    });

    target.classList.add("tab__active");

    tabs.forEach((tab) => {
      tab.classList.remove("tab__active");
    });

    tab.classList.add("tab__active");
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactSubject = document.getElementById("contact-subject"),
  contactMessage = document.getElementById("contact-message"),
  errorMessage = document.getElementById("error-message");

const sendEmail = (e) => {
  e.preventDefault();

  // check if the field has a value
  if (contactName.value === "" || contactEmail.value === "" || contactSubject.value === "" || contactMessage.value === "") {
    // show message
    errorMessage.textContent = "Write all the input fields";
  } else {
    // serviceID - templateID - #form - publickey
    emailjs.sendForm("service_xkk9vcv", "template_tfc478d", "#contact-form", "7jTvmpVtHakvumfAP").then(
      () => {
        // show message and add color, window + dot to open emoji
        errorMessage.classList.add("color-first");
        errorMessage.textContent = "Message sent ✔";

        // remove message after 3 seconds
        setTimeout(() => {
          errorMessage.textContent = "";
        }, 3000);
      },
      (error) => {
        alert("OOPs! SOMETHING WENT WRONG...", error);
      }
    );

    // clear input fields
    contactName.value = "";
    contactEmail.value = "";
    contactSubject.value = "";
    contactMessage.value = "";
  }
};

contactForm.addEventListener("submit", sendEmail);
