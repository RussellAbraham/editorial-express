(() => {
  'use strict'
  const addDarkTheme = () => {
    const link = document.createElement('link');
    link.href = '/styles/darkmode.css';
    link.rel = 'stylesheet';
    link.id = 'darkmodeStyle';
    document.querySelector('head').appendChild(link);
  };
  const removeDarkTheme = () => {
    document.querySelector('#darkmodeStyle').remove();
  };
  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    setTheme(storedTheme);
    if (storedTheme === 'dark') {
      addDarkTheme();
    }
  } else {
    setTheme(getPreferredTheme());
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#colourMode')
      .addEventListener('click', () => {
          const theme = document.querySelector('html').dataset.bsTheme;
          if (theme === 'dark') {
            setTheme('light');
            setStoredTheme('light');
            removeDarkTheme();
          } else if (theme === 'light') {
            setTheme('dark');
            setStoredTheme('dark');
            addDarkTheme();
          }
      })
  })
})()
