import { playRound } from "./script.js";

// Rounds per game
let rounds = 10;
let p_score = 0;
let c_score = 0;
let game_end = false;
let click_disabled = false;

const body = document.querySelector("body");
const final_results = document.createElement('p')
final_results.classList.toggle('glow')
final_results.setAttribute('style', 'font-size: 4vw; font-weight:900;')

// HIDE SHOW CONTENT
const start = document.querySelector(".start-button");
start.addEventListener("click", (e) => {
  logMessage(start_message);
  toggleContent();
  toggleStartButton();
  rounds = 10;
  roundUpdate(rounds);

  //   On restart
  if (game_end) {
    game_end = false;
    output_2.classList.toggle("hide");
    go_again_text.classList.toggle("hide");
    final_results.remove()
  }
});

const content = document.querySelector(".content");
function toggleContent() {
  content.classList.toggle("hide");
}

function toggleStartButton() {
  start.classList.toggle("hide");
}

// ROCK PAPER SCISSORS BUTTONS
const button_area = document.querySelector(".buttons");
const buttons = document.querySelectorAll(".buttons img");

buttons.forEach((button) => button.addEventListener("click", excecuteRound));

function excecuteRound(e) {
  // do not do anything if clicks are disabled
  if (click_disabled) return;
  const roundScore = playRound(this.id);
  if (roundScore > 0) {
    p_score++;
  } else if (roundScore == 0) {
    c_score++;
  }
  rounds--;
  updateScores(p_score, c_score);
  roundUpdate(rounds);
  if (rounds == 0) {
    endGame();
  }
}

// LOG MESSAGE
const msg_content = document.querySelector(".message");
const output = document.querySelector(".message p.text");
const output_2 = document.querySelector(".message p.prompt");
const round_output = document.querySelector(".prompt span");
const go_again_text = document.createElement("p");
go_again_text.textContent = "Ready to go again hit the start button 👇🏼";
go_again_text.classList.toggle("gradient-light");
go_again_text.classList.toggle("hide");

msg_content.appendChild(go_again_text);

const start_message = "Ready to exchange fists with a computer?";
export function logMessage(msg) {
  output.textContent = msg;
}

function roundUpdate(round) {
  round_output.textContent = round;
}

// DISPLAYING SCORE
const player_score = document.getElementById("player-score");
const comp_score = document.getElementById("computer-score");
player_score.textContent = 0;
comp_score.textContent = 0;

function updateScores(player, computer) {
  player_score.textContent = player;
  comp_score.textContent = computer;
}

// GAME ENDS
function endGame() {
  game_end = true;

  // delay clicks - so user can see their scores
  click_disabled = true;
  setTimeout(() => {
    click_disabled = false;

    if (p_score > c_score) logMessage("YOU WON 💪🏼");
    else if (p_score < c_score) logMessage("OOOF! YOU LOST 😭");
    else logMessage("WOW! I'ts a TIE 🤔");

    final_results.textContent = `You scored: ${p_score}\nComputer scored: ${c_score}`

    msg_content.insertBefore(final_results, go_again_text)
    // reset scores
    p_score = 0;
    c_score = 0;
    updateScores(0, 0);
    toggleContent();

    // then make text disappear, do some animations and go again
    output_2.classList.toggle("hide");
    go_again_text.classList.toggle("hide");

    // set a short delay before the start button re-appears
    setTimeout(()=> toggleStartButton(), 1000)
  }, 1000);
}

// DARK/LIGHT MODE function

const mode = document.getElementById("icon");
// default shadow
mode.classList.toggle('sunny')
let current_icon = mode.getAttribute("src");

mode.addEventListener("click", () => {
  body.classList.toggle("body-bg-color");
  mode.classList.toggle('sunny')
  mode.classList.toggle('moon')
  console.log();
  if (current_icon == "images_logos/sunny.png") {
    current_icon = "images_logos/moon.png";
    mode.setAttribute("src", current_icon);

  } else {
    current_icon = "images_logos/sunny.png";
    mode.setAttribute("src", current_icon);
  }
});
