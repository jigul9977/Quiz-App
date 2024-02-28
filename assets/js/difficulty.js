const difficultyButtons = document.querySelectorAll("span");

const selectHandler = (event) => {
  const level = event.target.innerText.toLowerCase();
	localStorage.setItem("level", level);
	window.location.assign("./")
};

difficultyButtons.forEach((buttons) => {
  buttons.addEventListener("click", selectHandler);
});
