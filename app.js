let sliderImages,
  arrowLeft,
  arrowRight,
  current = 0;

let mainTimer;

function getNext(n) {
  return n >= sliderImages.length - 1 ? 0 : n + 1;
}
function getPrev(n) {
  return n <= 0 ? sliderImages.length - 1 : n - 1;
}

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.opacity = 0;
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.opacity = 1;
}

function resetMainTimer(){
  clearInterval(mainTimer);
  mainTimer = setInterval(slideRight, 10000);
}

// Show prev
function slideLeft() {
  var id = setInterval(test, 15);
  function test() {
    if (sliderImages[current].style.opacity > 0) {
      sliderImages[current].style.opacity -= 0.01;
      sliderImages[getPrev(current)].style.opacity =
        parseFloat(sliderImages[getPrev(current)].style.opacity) + 0.01;
    } else {
      current = getPrev(current);
      clearInterval(id);
    }
  }
  resetMainTimer();
}

// Show next
function slideRight() {
  var id = setInterval(test, 10);
  function test() {
    if (sliderImages[current].style.opacity > 0) {
      sliderImages[current].style.opacity -= 0.01;
      sliderImages[getNext(current)].style.opacity =
        parseFloat(sliderImages[getNext(current)].style.opacity) + 0.01;
    } else {
      current = getNext(current);
      clearInterval(id);
    }
  }
  resetMainTimer();
}

window.onload = function() {
  sliderImages = this.document.querySelectorAll(".slide");
  arrowLeft = this.document.querySelector("#slide-arrow-left");
  arrowRight = this.document.querySelector("#slide-arrow-right");

  arrowLeft.addEventListener("click", function() {
    slideLeft();
  });
  arrowRight.addEventListener("click", function() {
    slideRight();
  });

  resetMainTimer();
  startSlide();
};
