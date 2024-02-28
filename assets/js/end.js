const score = JSON.parse(localStorage.getItem("score"));
const highscore = JSON.parse(localStorage.getItem("highscore")) || [];

const scoreText = document.getElementById("score");
const saveButton = document.getElementById("save-btn");
const usernameInput = document.getElementById("username");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
	
scoreText.innerText = score;

const showCustomAlert = (message, type) => {
  alertPlaceholder.innerHTML = ""; //Preventing the creation of several identical alerts in a row
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <strong>${message}</strong>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert"></button>',
    "</div>",
  ].join("");
  alertPlaceholder.append(wrapper);
  setTimeout(() => {
    //To make the alert disappear after 3 seconds
    wrapper.style.display = "none";
  }, 3000);
};

const saveScore = () => {
  if (!usernameInput.value) {
    showCustomAlert("Please Enter Your Username.", "danger");
  } else if (!score) {
    showCustomAlert("Invalid Score.", "warning");
  } else {
		const finalScoreObject = {
			playerName: usernameInput.value,
			playerScore: score
		};
		highscore.push(finalScoreObject);
		highscore.sort((a, b) => b.score - a.score);
		highscore.splice(10);
		localStorage.setItem("highscore", JSON.stringify(highscore));
		localStorage.removeItem("score");
		window.location.assign("./index.html");
  }
};

saveButton.addEventListener("click", saveScore);
