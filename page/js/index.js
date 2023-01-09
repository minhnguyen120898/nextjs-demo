function main() {
  document.addEventListener('scroll', debounce(() => onScroll()));
}

function onScroll() {
  let header = document.getElementById("header");
  let number = document.scrollingElement?.scrollTop || 0;
  if (number > 109) {
    header.classList.add("bg-white");
  } else {
    header.classList.remove("bg-white");
  }
}

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}

function toogleMenu() {
  let menuButton = document.getElementById("toggle-button");
  let sidenav = document.getElementById("side-nav");
  menuButton.classList.toggle("on");
  sidenav.classList.toggle("open");
}

function showSearch() {
  let searchEle = document.getElementById("search-text-header");
  let searchBox = document.getElementById("search-box");
  searchBox.classList.toggle("active");
  if (searchBox.classList.contains("active")) {
    searchEle?.focus();
  } else {
    searchEle?.blur();
  }
}

main();
