$(document).ready(function(){
  $(".main_cat").click(function() {
    $(".main_type").show();
  });

  var href = location.href;
  if(href.includes("checkout")) {
    $(".cart_icon").hide();
  } else {
    var width = $( document ).width();
    $(".cart_icon").css("margin-left",width-70+"px")
  }
});

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-aqua", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-aqua";
}

function open_prod_type(obj) {
  var name = $(obj).attr("name");
  if( $("."+name).css("display") == "none") {
    $("."+name).css("display","block")
  } else $("."+name).css("display","none")
}

function goto(url){
  alert(2)
  location.href = url;
}