//SIDE MENU
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
} 
$(document).ready(function() {

//SLICK SLIDER
    $('.slider').slick({
     infinite: false,
    arrows: true,
    fade: true,
    
     prevArrow:'<button type="button" class="slick-prev">Previous</button>',
     nextArrow:'<button type="button" class="slick-next">Previous</button>'


	
});

});




   