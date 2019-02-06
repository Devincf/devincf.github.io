let sliderImages,
  arrowLeft,
  arrowRight,
  current = 0;

    function getNext(n){
        return (n >= sliderImages.length-1)? 0:n+1;
    }
    function getPrev(n){
        return (n <= 0)? sliderImages.length-1:n-1;
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
  
  // Show prev
  function slideLeft() {
    var id = setInterval(test,15);
    function test(){
        if(sliderImages[current].style.opacity > 0){
            //console.log(sliderImages[(current+1)%sliderImages.length].style.opacity);
            sliderImages[current].style.opacity-= 0.01;
            sliderImages[getPrev(current)].style.opacity= parseFloat(sliderImages[getPrev(current)].style.opacity) + 0.01;
        }else{
            current = getPrev(current);
            clearInterval(id);
        }
    };
  }
  
  // Show next
  function slideRight() {
    var id = setInterval(test,10);
    function test(){
        if(sliderImages[current].style.opacity > 0){
            //console.log(sliderImages[(current+1)%sliderImages.length].style.opacity);
            sliderImages[current].style.opacity-= 0.01;
            sliderImages[getNext(current)].style.opacity= parseFloat(sliderImages[getNext(current)].style.opacity) + 0.01;
        }else{
            current = getNext(current);
            clearInterval(id);
        }
    };
  }
  

window.onload = function() {
    console.log("onload1");
  sliderImages = this.document.querySelectorAll(".slide");
  arrowLeft = this.document.querySelector("#slide-arrow-left");
  arrowRight = this.document.querySelector("#slide-arrow-right");

  arrowLeft.addEventListener("click", function() {
    slideLeft();
  });
  
  // Right arrow click
  arrowRight.addEventListener("click", function() {
    slideRight();
  });

  setInterval(slideRight, 10000);


  console.log("onload2");
    startSlide();

    console.log("onload3");
};
// Left arrow click


console.log("as");
