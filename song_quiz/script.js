/////////////////###########
function results() {
  const numberSong = document.querySelectorAll(".songs").length;
  let results = [];
  let result = "";
  for (var num = 1; num < numberSong + 1; num++) {
    let radioes = document.getElementsByName("song" + num.toString());
    for (let i = 0; i < radioes.length; i++) {
      if (radioes[i].checked) {
        results.push(radioes[i].value);
        radioes[i].checked = false;
      }
    }
  }
  if (results.length != num - 1) {
    return alert("You need to answer all questions");
  }

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "correct") {
      result = result.concat(
        "You identified correctly SONG" + (i + 1).toString() + " <br><br>"
      );
    } else {
      result = result.concat(
        "You didn't identified SONG" + (i + 1).toString() + " <br><br>"
      );
    }
  }
  ////////////////////
  function yourScore(results) {
    let score = Number(0);
    results.forEach(function (element) {
      if (element === "correct") {
        score++;
      }
    });

    let Score = (score / numberSong) * 100;
    if (Score < 50) {
      return Score + " %";
    } else {
      return Score + " % " + '<img src="clapping-hands.png">';
    }
  }
  ///////##################################
  document.getElementById("result").classList.add("model");
  /////////////////""""#################################
  return window.setTimeout(function () {
    document.getElementById(
      "result"
    ).innerHTML = `<div style="float:right; padding:2px; margin:2px; cursor:pointer; margin-right:25px;" 
id="cross">&#10005</div>
<br><br><br><br>
${result}
<hr style="width:25%;">Your score: <span> ${yourScore(
      results
    )} </span> <hr style="width:25%;">`;
    document.getElementById("result").style.display = "block";
    document.getElementById("cross").addEventListener("click", () => {
      document.getElementById("result").style.display = "none";
    });
  }, 2000);
}
