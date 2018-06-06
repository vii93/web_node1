$(document).ready(function(){
  $(".bxslider").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }); 

  $(".slider").slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1
  }); 
});

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
}