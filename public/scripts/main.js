const flash = (message, type, target) => {
	target.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');
  target.append(wrapper);
};

const switchTheme = () => {
  const html = document.querySelector('html');
  const currentTheme = html.dataset.bsTheme;

  // Toggle the theme
  if (currentTheme === 'dark') {
    html.dataset.bsTheme = 'light';
  } else if (currentTheme === 'light') {
    html.dataset.bsTheme = 'dark';
  }

  // Save the theme to localStorage
  localStorage.setItem('theme', html.dataset.bsTheme);
};

// Function to set the theme on page load
const setThemeOnLoad = () => {
  const html = document.querySelector('html');
  const savedTheme = localStorage.getItem('theme');

  // If there's a saved theme, apply it
  if (savedTheme) {
    html.dataset.bsTheme = savedTheme;
  }
};

// should fire first
document.addEventListener('DOMContentLoaded', function(event){
  setThemeOnLoad();
}, false);


// should fire last
window.addEventListener('load', function(event){

}, false);

// fires when window unloads
//window.addEventListener("beforeunload", function(event) {
//  event.returnValue = "Are you sure?";
//}, false);
