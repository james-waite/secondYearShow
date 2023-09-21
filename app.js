let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./images/${idx + 1}.jpg)`;
  image.addEventListener('click', function () {
    loadVideo(`${idx + 1}`);
  });
});

items.forEach((item, idx) => {
  let clone = item.cloneNode(true);
  clone.classList.add('clone');
  clone.addEventListener('click', function () {
    loadVideo(`${idx + 1}`);
  });
  slider.appendChild(clone);
  clones.push(clone);
});

function getClonesWidth() {
  let width = 0;
  clones.forEach((clone) => {
    width += clone.offsetWidth;
  });
  return width;
}

function getScrollPos() {
  return window.scrollY;
}

// function setScrollPos(pos) {
//   window.scrollTo({ top: pos });
// }

function scrollUpdate() {
  if (window.innerWidth > 540) {
    sliderWrap.style.overflow = 'hidden';
    scrollPos = getScrollPos();
    if (clonesWidth + scrollPos >= sliderWidth) {
      window.scrollTo({ top: 1 });
    } else if (scrollPos <= 0) {
      window.scrollTo({ top: sliderWidth - clonesWidth - 1 });
    }

    slider.style.transform = `translateX(${-window.scrollY}px)`;

    requestAnimationFrame(scrollUpdate);
  } else {
    sliderWrap.style.overflow = 'scroll';
  }
}

window.addEventListener('resize', onLoad);

function onLoad() {
  calculateDimensions();
  document.body.style.height = `${sliderWidth}px`;
  window.scrollTo({ top: 1 });
  scrollUpdate();

  loadVideo(1);
}

function calculateDimensions() {
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
}

onLoad();

function loadVideo(imgVal) {
  // console.log(imgVal);
  let videoElem = document.getElementsByTagName('video')[0];
  let sourceElem = videoElem.getElementsByTagName('source')[0];
  sourceElem.src = `./videos/${imgVal}.mp4`;
  console.log(sourceElem.src);
  videoElem.load();
  videoElem.play();
}

// function loadVideo1() {
//   var videoEl = document.getElementsByTagName('video')[0];
//   var sourceEl = videoEl.getElementsByTagName('source')[0];
//   sourceEl.src = 'video1.mp4';
//   videoEl.load();
//  }

//  function loadVideo2() {
//   var videoEl = document.getElementsByTagName('video')[0];
//   var sourceEl = videoEl.getElementsByTagName('source')[0];
//   sourceEl.src = 'video2.mp4';
//   videoEl.load();
//  }
