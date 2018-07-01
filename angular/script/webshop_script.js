$(document).ready(function(){
  console.log($(window).innerWidth())
  $(".main_cat").click(function() {
    $(".main_type").show();
  });

  var href = location.href;
});

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-pale-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-pale-red";
}

function open_prod_type(obj) {
  var name = $(obj).attr("name");
  if( $("."+name).css("display") == "none") {
    $("."+name).css("display","block")
  } else $("."+name).css("display","none")
}

function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function open_mobile_nav() {
  document.getElementById("navbar_mobile").style.width = "350px";
}

function close_mobile_nav() {
  document.getElementById("navbar_mobile").style.width = "0";
}