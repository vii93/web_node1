$(document).ready(function(){
  $(".main_cat").click(function() {
    $(".main_type").show();
  });
  $('body').click(function() {
    if($("#navbar_mobile").width() > 0)
      close_mobile_nav();
    if($("#mySidenav").width() > 0) {
      closeNav()
    }
  });
  $('#search').keypress(function(event){
    if(event.keyCode == 13){
      $('#search_btn').click();
    }
  });
  $('#search_mobile').keypress(function(event){
    if(event.keyCode == 13){
      $('#search_mobile_btn').click();
    }
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
  if($(document).width() <= 1000) {
    document.getElementById("mySidenav").style.width = "600px";
  }else {
    document.getElementById("mySidenav").style.width = "350px";
  }
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