import {logMessage} from './events.js'

function getComputerChoice() {
  let choice = ["Rock", "Paper", "Scissors"];
  return choice[parseInt(Math.random() * 3)];
}



let playRound = (playerChoice) => {
  const computerChoice = getComputerChoice()
  switch (playerChoice.toLowerCase()) {
    case "rock":
      switch (computerChoice) {
        case "Paper":
          logMessage("You Lose! Paper beats Rock");
          return 0;
          break;
        case "Scissors":
          logMessage("You Won! Rock beats Scissors");
          return 1;
          break;
        default:
          logMessage("It's a tie: Rocks");
          return -1;
          break;
      }
      break;
    case "paper":
      switch (computerChoice) {
        case "Rock":
          logMessage("You Win! Paper beats Rock");
          return 1;
          break;
        case "Scissors":
          logMessage("You Lose! Scissors beats Paper");
          return 0;
          break;
        default:
          logMessage("It's a tie: Paper");
          return -1;
          break;
      }
      break;

    case "scissors":
      switch (computerChoice) {
        case "Paper":
          logMessage("You Win! Scissors beats Paper");
          return 1;
          break;
        case "Rock":
          logMessage("You Lose! Rock beats Scissors");
          return 0;
          break;
        default:
          logMessage("It's a tie: Scissors");
          return -1;
          break;
      }
      break;

    default:
      return "Something ain't right";
      break;
  }
};

/* 
let game = () => {
  const choices = new Set(["rock", "paper", "scissors"]);
  let playerScore = 0;
  let computerScore = 0;
  let tie = 0;
  let playerQuit = false;
  for (let i = 0; i < 5; i++) {
    let choice = prompt(
      `GAME ${i + 1}: Choose ["Rock", "Paper" or "Scissors"] \nType q to quit`
    );

    while (!choices.has(choice.toLowerCase()) & (choice != "q"))
      choice = prompt(
        `GAME ${
          i + 1
        }: Please enter a valid choice: \n["Rock", "Paper" or "Scissors"] \nType q to quit`
      );

    if (choice == "q") {
      playerQuit = true;
      console.log("SAD to see you leave ☹️");
      break;
    }

    // The score for the player in this round
    let roundScore = playRound(choice, getComputerChoice());

    if (roundScore > 0) {
      playerScore++;
    } else if (roundScore == 0) {
      computerScore++;
    } else tie++;
  }
  if (!playerQuit) {
    if (playerScore > computerScore) console.log("COngrats you won!");
    else if (playerScore < computerScore)
      console.log("Ouch! the computer beat you");
    else console.log("Wow A Great Tie!");
  }

  console.log(
    `Finale Score PLAYER: ${playerScore} vs COMPUTER: ${computerScore}  TIES: ${tie}`
  );
}; */

// game();
export {playRound};