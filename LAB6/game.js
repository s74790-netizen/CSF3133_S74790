// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Starts the game after validating player name
function startGame() {
    const nameInput = document.getElementById("playerName");
    const playerName = nameInput.value.trim();

    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + playerName + "!";
    document.getElementById("startTime").innerHTML = "Started at: " + new Date();
}

// Randomly selects rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round of Rock, Paper, Scissors
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images (expects rock.png, paper.png, scissors.png in the same folder)
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";

    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
    } else {
        outcome = "Lose";
        losses++;
    }

    // Store outcome in results array
    results.push(outcome);

    // Update result message and color
    const resultEl = document.getElementById("result");
    if (outcome === "Win") {
        resultEl.innerHTML = "You Win! (" + playerChoice + " beats " + computerChoice + ")";
        resultEl.style.color = "green";
    } else if (outcome === "Lose") {
        resultEl.innerHTML = "You Lose! (" + computerChoice + " beats " + playerChoice + ")";
        resultEl.style.color = "red";
    } else {
        resultEl.innerHTML = "It's a Draw! (Both chose " + playerChoice + ")";
        resultEl.style.color = "grey";
    }

    // Update scoreboard counts
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append a new row to the history table
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + outcome + "</td>" +
        "</tr>";
}

// Calculates and displays rounds played and rounded win percentage using a for loop
function showSummary() {
    let winCount = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const totalRounds = results.length;
    const percentage = totalRounds > 0 ? Math.round((winCount / totalRounds) * 100) : 0;

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " + percentage + "%.";
}

// Resets scores, results array, history table, and messages back to initial state
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("playerName").value = "";
    document.getElementById("welcomeMsg").innerHTML = "";

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").style.color = "";
    document.getElementById("summary").innerHTML = "";
}

