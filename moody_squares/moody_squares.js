function changecolor(cell) {
   cell.style.backgroundColor =
    (cell.style.backgroundColor == "white" ? "#cccccc" : "white");

(cell.style.backgroundColor ==  "#cccccc" ? "white" : "#cccccc")}

function changeall() {
  changecolor(document.getElementById("c1"));
  changecolor(document.getElementById("c2"));
  changecolor(document.getElementById("c3"));
  changecolor(document.getElementById("c4"));
changecolor(document.getElementById("c5"));
 changecolor(document.getElementById("c6"))}
