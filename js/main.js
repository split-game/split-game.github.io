let numbers = Array.from(document.querySelectorAll(".number"));
let splits = Array.from(document.querySelectorAll(".split"));
let startButton = document.querySelector("#start-button");
let players = Array.from(document.querySelectorAll(".player"));
let turn = document.querySelector(".turn-active");
let main = document.getElementById("main-layout");
let buttonLogo = document.querySelector("#button-logo");
let straightups = document.querySelectorAll(".straight");

function getNumber() {
  var num = Math.floor(Math.random() * 36);
  // var num = 5;

  numbers.map((number) => {
    number.dataset.number == num.toString()
      ? number.classList.add("number-active")
      : number.classList.remove("number-active");
  });

  buttonLogo.style.backgroundColor =
    document.querySelector(".turn-active").dataset.color;
  startButton.setAttribute("disabled", true);
  startButton.style.pointerEvents = "none";

  markSplits(splits, num);

  if (+num >= 19) {
    main.scrollTo({ top: main.scrollHeight, behavior: "smooth" });
  } else {
    main.scrollTo({ top: 0, behavior: "smooth" });
  }
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

  if (splitArr.length === 0) {
    players.forEach((player) => {
      if (player.classList.contains("turn-active")) {
        player.classList.remove("turn-active");
      } else {
        player.classList.add("turn-active");
      }
    });

    startButton.removeAttribute("disabled");
    startButton.style.pointerEvents = "all";
  } else {
    splitArr.map((split) => {
      split.classList.add("active");
      split.setAttribute("onclick", `checkSplit(this, ${number} )`);
    });
  }
}

function checkSplit(split, number) {
  var matchingSplits = [];
  var matchingNumber;
  split.style.background = document.querySelector(".turn-active").dataset.color;
  split.dataset.check = document.querySelector(".turn-active").id;

  console.log(document.querySelector(".turn-active").id);

  split.classList.add("checked");
  splits.forEach((rem) => {
    rem.removeAttribute("onclick");
    rem.classList.remove("active");
  });

  numbers.forEach((numb) => {
    if (+numb.dataset.number === +number) {
      matchingNumber = numb;
    }
  });

  splits.forEach((num) => {
    if (
      num.dataset.split.split("-").some((val) => val === number.toString()) &&
      num.classList.contains("checked") &&
      num.dataset.check === document.querySelector(".turn-active").id
    ) {
      matchingSplits.push(num);
    }
  });

  if (+matchingNumber.dataset.amount === matchingSplits.length) {
    matchingNumber.children[0].style.backgroundColor =
      document.querySelector(".turn-active").dataset.color;
  }

  numbers.map((number) => {
    number.classList.remove("number-active");
  });

  startButton.removeAttribute("disabled");
  startButton.style.pointerEvents = "all";

  players.forEach((player) => {
    if (player.classList.contains("turn-active")) {
      player.classList.remove("turn-active");
    } else {
      player.classList.add("turn-active");
    }
  });
}
