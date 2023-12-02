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
  const link = document.createElement('link');
  link.href = '/styles/darkmode.css';
  link.rel = 'stylesheet';
  link.id = 'darkmodeStyle';

  // Toggle the theme
  if (currentTheme === 'dark') {
    html.dataset.bsTheme = 'light';
    document.querySelector('#darkmodeStyle').remove();
  } else if (currentTheme === 'light') {
    html.dataset.bsTheme = 'dark';
    document.querySelector('head').appendChild(link);
  }

  // Save the theme to localStorage
  localStorage.setItem('theme', html.dataset.bsTheme);
};

const setThemeOnLoad = () => {
  const html = document.querySelector('html');
  const savedTheme = localStorage.getItem('theme');

  // If there's a saved theme, apply it
  if (savedTheme) {
    html.dataset.bsTheme = savedTheme;

    // If dark mode is active, append the dark mode stylesheet to the head
    if (savedTheme === 'dark') {
      const link = document.createElement('link');
      link.href = '/styles/darkmode.css';
      link.rel = 'stylesheet';
      link.id = 'darkmodeStyle';
      document.querySelector('head').appendChild(link);
    }
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
