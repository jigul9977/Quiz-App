const highscore = JSON.parse(localStorage.getItem("highscore")) || [];
const topScoreList = document.querySelector("ul");

topScoreList.innerHTML = highscore.map((item, index) => {
	const row = [
		`<li>`,
			`<span>${index + 1}</span>`,
			`<p>${item.playerName}</p>`,
			`<span>${item.playerScore}</span>`,
			`</li>`
	].join("");
	return row;
}).join("");
