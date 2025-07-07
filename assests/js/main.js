const toggleButton = document.querySelector('.my__toggle');
const navbar= document.querySelector('.my__navbar');

toggleButton.addEventListener('click', () => {
  navbar.classList.toggle('show');
  toggleButton.classList.toggle('show');
  if (navbar.classList.contains('show')) {
    toggleButton.classList.replace('bi-list', 'bi-x');
  } else {
    toggleButton.classList.replace('bi-x', 'bi-list');
  }
  
})