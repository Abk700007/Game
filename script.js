$(document).ready(function () {
  let playerScore = 0;
  let computerScore = 0;
  let round = 1;
  let matchGoal = 0; // Match goal will be 3, 5, or 10
  let playerName = "";

  const choices = ["rock", "paper", "scissors"];
  const getComputerChoice = () => choices[Math.floor(Math.random() * 3)];

  const getResult = (player, computer) => {
    if (player === computer) return "draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "win";
    }
    return "lose";
  };

  const updateScore = (result) => {
    if (result === "win") playerScore++;
    if (result === "lose") computerScore++;
    $("#player-score").text(playerScore);
    $("#computer-score").text(computerScore);
  };

  const updateRound = () => {
    $("#round-counter").text(round);
  };

  const showBanner = (result) => {
    const banner = $("#game-banner");
    if (result === "win") {
      banner.text(`${playerName}'s Point!`);
      banner.removeClass().addClass("game-banner win-banner").fadeIn();
      $("#win-sound")[0].play();
    } else if (result === "lose") {
      banner.text(`Computer's Point!`);
      banner.removeClass().addClass("game-banner lose-banner").fadeIn();
      $("#lose-sound")[0].play();
    } else {
      banner.text(`It's a Draw!`);
      banner.removeClass().addClass("game-banner draw-banner").fadeIn();
    }
    setTimeout(() => {
      banner.fadeOut();
    }, 1000);
  };

  const showFinal = (result) => {
    const Final = $("#Final");
    if (result === "win") {
      Final.text(`You Won!! Great Match 🎉🎉`);
      Final.removeClass().addClass("Final win-banner").fadeIn();
      $("#winning-sound")[0].play();
    } else if (result === "lose") {
      Final.text(`You Lost! Try again`);
      Final.removeClass().addClass("Final lose-banner").fadeIn();
    } else {
      Final.text(`It's a Draw!`);
      Final.removeClass().addClass("Final draw-banner").fadeIn();
    }
    setTimeout(() => {
      Final.fadeOut();
    }, 4000);
  };

  const resetRound = () => {
    if (playerScore >= matchGoal || computerScore >= matchGoal) {
      setTimeout(() => {
        if (playerScore > computerScore) {
          showFinal("win");
        } else if (playerScore < computerScore) {
          showFinal("lose");
        } else {
          showFinal("draw");
        }
        playerScore = 0;
        computerScore = 0;
        round = 1;
        updateScore();
        updateRound();
        $("body").css("background", "linear-gradient(to right, #3a6186, #89253e)");
      }, 1000);
    } else {
      round++;
      updateRound();
    }
  };

  // Start Game - Name Entry
  $("#start-game").click(function () {
    playerName = $("#player-name").val().trim();
    if (playerName === "") {
      alert("Please enter your name to start the game.");
      return;
    }

    $(".name-input").hide();
    $(".match-type-input").show();
  });

  // Start Match - Match Type Selection
  $("#start-match").click(function () {
    matchGoal = parseInt($("#match-type").val());
    $("#match-goal").text(matchGoal);

    $(".match-type-input").hide();
    $(".game-section").show();
    $("#player-name-display").text(playerName);
  });

  // Player's Choice and Game Logic
  $(".choice").click(function () {
    const playerChoice = $(this).data("choice");
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    let resultMessage;
    if (result === "win") {
      resultMessage = `Great ${playerName}!! ${playerChoice} beats ${computerChoice}.`;
    } else if (result === "lose") {
      resultMessage = `Ohh!! ${computerChoice} beats ${playerChoice}.`;
    } else {
      resultMessage = `It's a Draw! You both chose ${playerChoice}.`;
    }

    $("#result-text").text(resultMessage);
    updateScore(result);
    showBanner(result);
    resetRound();
  });
});
