
$(document).ready(function() {
document.getElementById("mySidepanel").style.fontFamily = "Helvetica, sans-serif";



//SLICK SLIDER
    $('.slider').slick({
     infinite: false,
    arrows: true,
    fade: true,
    
     prevArrow:'<button type="button" class="slick-prev">Previous</button>',
     nextArrow:'<button type="button" class="slick-next">Previous</button>'


	
});

});
//SIDE MENU
function openNav() {
  document.getElementById("mySidepanel").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
} 




   