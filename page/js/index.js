function main() {
  document.addEventListener('scroll', debounce(() => onScroll()));

  $(document).on("ready", function () {
    $(".slick-slider").slick({
      dots: true,
      arrows: true,
      prevArrow: $('.slick-prev1'),
      nextArrow: $('.slick-next1'),
      // autoplay: true,
      // infinite: true,
      // autoplaySpeed: 3000,
      // speed: 500,
      slidesToScroll: 1,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      variableHeight: true,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false
          },
        },
      ],
    });

    $(".slick-slider2").slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $('.slick-prev2'),
      nextArrow: $('.slick-next2'),
      variableWidth: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        }
      ]
    });
  });
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
