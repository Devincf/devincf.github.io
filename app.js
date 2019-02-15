let sliderImages,
  arrowLeft,
  arrowRight,
  current = 0,
  arrow1,arrow2;

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
  current = 0;
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

window.onscroll = function(a){
  if(a.pageY == 0){
    arrow1.style.display = "none";
  }else if(a.pageY >= 1650){
    arrow2.style.display = "none";
  }else{
    if(arrow1.style.display == "none") 
        arrow1.style.display = "block";

    if(arrow2.style.display == "none") 
      arrow2.style.display = "block";
  }
}

function getCorrectUpAnchor(){
  const pos = window.pageYOffset;

  if(pos >= 0 && pos <= 1000){
    return document.body;
  }else if(pos > 1000){
    return document.querySelector(".anchor-1");
  }
}

function getCorrectDownAnchor(){  
  const pos = window.pageYOffset;

  if(pos >= 0 && pos <= 650){
    return document.querySelector(".anchor-1");
  }else if(pos > 650 && pos < 1665){
    return document.querySelector(".anchor-2");
  }else if(pos >= 1665){
    return document.querySelector("footer");
  }
}

window.onload = function() {
  sliderImages = this.document.querySelectorAll(".slide");
  arrowLeft = this.document.querySelector("#slide-arrow-left");
  arrowRight = this.document.querySelector("#slide-arrow-right");
  arrow1 = this.document.querySelector(".arrow-up");
  arrow1.style.display = "none";
  arrow2 = this.document.querySelector(".arrow-down");

  a = this.document.querySelector("#time");

  test = setInterval(function(){
    date = new Date();
    a.innerText = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
  },1);
  arrowLeft.addEventListener("click", function() {
    slideLeft();
  });
  arrowRight.addEventListener("click", function() {
    slideRight();
  });
  arrow1.addEventListener("click", function(){
    startSlide();
    getCorrectUpAnchor().scrollIntoView({ 
      behavior: 'smooth'
    });

  });

  arrow2.addEventListener("click", function(){
    startSlide();
    getCorrectDownAnchor().scrollIntoView({ 
      behavior: 'smooth'
    });

  });


  resetMainTimer();
  startSlide();
};
