let numbers = Array.from(document.querySelectorAll(".number"));
let splits = Array.from(document.querySelectorAll(".split"));
let startButton = document.querySelector("#start-button");
let players = Array.from(document.querySelectorAll(".player"));
let turn = document.querySelector(".turn-active");

function getNumber() {
  var num = Math.floor(Math.random() * 36);

  numbers.map((number) => {
    number.dataset.number == num.toString()
      ? number.classList.add("number-active")
      : number.classList.remove("number-active");
  });

  startButton.setAttribute("disabled", true);
  startButton.style.pointerEvents = "none";
  startButton.style.opacity = "0.5";

  markSplits(splits, num);
}

function markSplits(arr, number) {
  var splitArr = [];
  arr.forEach((split) => {
    if (
      split.dataset.check === "" &&
      split.dataset.split.split("-").some((val) => val === number.toString())
    ) {
      splitArr.push(split);
    }
  });

  arr.map((split) => {
    if (split.dataset.check === "") {
      split.classList.remove("active");
    }
  });

  splitArr.map((split) => {
    split.classList.add("active");
    split.setAttribute("onclick", "checkSplit(this)");
  });
}

function checkSplit(split) {
  split.style.background = document.querySelector(".turn-active").dataset.color;
  split.dataset.check = turn.id;
  split.classList.add("checked");
  splits.forEach((rem) => {
    rem.removeAttribute("onclick");
    rem.classList.remove("active");
  });

  numbers.map((number) => {
    number.classList.remove("number-active");
  });

  startButton.removeAttribute("disabled");
  startButton.style.pointerEvents = "all";
  startButton.style.opacity = "1";

  players.forEach((player) => {
    if (player.classList.contains("turn-active")) {
      player.classList.remove("turn-active");
    } else {
      player.classList.add("turn-active");
    }
  });
}
